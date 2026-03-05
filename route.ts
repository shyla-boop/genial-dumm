import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { supabaseAdmin } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const body = await req.text();
  const sig = headers().get("stripe-signature");

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig!, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    return new NextResponse("Webhook signature verification failed.", { status: 400 });
  }

  // Minimal: wenn Stripe eine Email im Checkout hat, setzen wir den passenden Supabase-User als VIP.
  // Für robust: Kunden-ID mappen, customer portal, etc.
  const admin = supabaseAdmin();

  async function setVipByEmail(email: string, isVip: boolean) {
    const { data, error } = await admin.auth.admin.listUsers({ page: 1, perPage: 200 });
    if (error) return;
    const user = data.users.find((u) => u.email?.toLowerCase() === email.toLowerCase());
    if (!user) return;

    await admin.from("profiles").upsert({ id: user.id, is_vip: isVip }, { onConflict: "id" });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const email = session.customer_details?.email;
      if (email) await setVipByEmail(email, true);
      break;
    }
    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      // Email ist hier nicht immer dabei -> in produktiv customerId mapping nutzen.
      // MVP: keine Aktion.
      break;
    }
    default:
      break;
  }

  return NextResponse.json({ received: true });
}
