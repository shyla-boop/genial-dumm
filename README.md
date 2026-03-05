# genial-dumm-pwa (verkaufsfertige Web/PWA)

Eine kleine Spaß-App: **tägliche verrückte Challenges**, Favoriten, Beweis-Uploads, TikTok-Share, VIP-Abo (5 Challenges/Tag).

## Tech
- Next.js (App Router) + TypeScript
- TailwindCSS
- Supabase (Auth, Postgres, Storage)
- Stripe (Abo / VIP)

---

## 1) Setup

### Voraussetzungen
- Node.js 18+ (oder 20+)
- Supabase Projekt
- Stripe Account

### Install
```bash
npm install
cp .env.example .env.local
npm run dev
```

---

## 2) Supabase konfigurieren

### SQL ausführen
Im Supabase Dashboard → **SQL Editor** → Inhalt aus `supabase/schema.sql` ausführen.

### Storage Bucket
Supabase → **Storage** → Bucket anlegen: `proofs` (public oder private – empfohlen private + signed URLs).
Wenn private: in `lib/supabase/storage.ts` ist ein signed-url helper.

### Auth
Supabase → Authentication → Email aktivieren (Magic Link optional).

---

## 3) Stripe konfigurieren (VIP)

1. Stripe → Products → Produkt „VIP“ erstellen (Recurring, z. B. monatlich).
2. Price-ID in `.env.local` eintragen.
3. Webhook anlegen:
   - Endpoint: `https://<deine-domain>/api/stripe/webhook`
   - Events: `checkout.session.completed`, `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`
4. Webhook Secret in `.env.local` eintragen.

---

## 4) Deploy
Empfohlen: Vercel.
- Env Vars wie in `.env.example`
- Danach Domain verbinden.

---

## 5) TikTok Interaktion (realistisch & store-sicher)
TikTok erlaubt nicht „einfach so“ fremde Uploads via API.
Diese App macht es so:
- Nutzer laden **Beweise in die App** (Foto/Video).
- Mit „Teilen“ wird ein **Deep-Link** geöffnet (Share-Sheet / TikTok).
- Optional: Challenge-Link teilen, um Freunde zu animieren.

---

## Anpassungen
- Farben/UI: `app/globals.css`, `components/ui/*`
- Challenge-Pool: `data/challenges.ts`
- 1/5 pro Tag Logik: `lib/challenge.ts`

Viel Spaß 😄
