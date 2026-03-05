"use client";

import { useEffect, useMemo, useState } from "react";
import { GlassCard } from "@/components/ui/card";
import { PillButton } from "@/components/ui/pill";
import { pickDailyChallenge, pickNChallenges } from "@/lib/challenge";
import { shareOrCopy } from "@/lib/webshare";
import { supabase } from "@/lib/supabase/client";

type Tier = "free" | "vip";

async function getTier(): Promise<Tier> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return "free";
  const { data } = await supabase.from("profiles").select("is_vip").eq("id", user.id).single();
  return data?.is_vip ? "vip" : "free";
}

export function ChallengeView() {
  const [tier, setTier] = useState<Tier>("free");
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<string | null>(null);

  const challenges = useMemo(() => {
    const n = tier === "vip" ? 5 : 1;
    return pickNChallenges(n);
  }, [tier]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setTier(await getTier());
      setLoading(false);
    })();
  }, []);

  async function addFavorite(challengeId: string, text: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setToast("Bitte einloggen, um Favoriten zu speichern.");
      return;
    }
    const { error } = await supabase.from("favorites").insert({ user_id: user.id, challenge_id: challengeId, text });
    if (error) setToast("Konnte nicht gespeichert werden (evtl. schon Favorit).");
    else setToast("Gespeichert ❤");
  }

  async function shareChallenge(text: string) {
    const url = `${location.origin}/challenge`;
    const res = await shareOrCopy({ title: "genial dumm", text: `Meine Challenge: ${text}`, url });
    setToast(res.ok ? (res.method === "share" ? "Teilen geöffnet ✅" : "In Zwischenablage kopiert ✅") : "Teilen fehlgeschlagen");
  }

  return (
    <div className="space-y-4">
      <header className="text-center mt-2">
        <h1 className="text-3xl font-black">Deine Challenge{tier === "vip" ? "s" : ""} ⚡</h1>
        <p className="text-white/70 mt-2">
          {loading ? "Lade..." : tier === "vip" ? "VIP: 5 pro Tag" : "Free: 1 pro Tag"}
        </p>
      </header>

      {challenges.map((c) => (
        <GlassCard key={c.id} className="space-y-4">
          <div className="text-lg font-semibold">{c.text}</div>

          <div className="flex gap-3">
            <PillButton className="text-base py-3" onClick={() => addFavorite(c.id, c.text)}>
              ❤ Favorit
            </PillButton>
            <PillButton className="text-base py-3" variant="secondary" onClick={() => shareChallenge(c.text)}>
              📲 Teilen (TikTok & Co.)
            </PillButton>
          </div>

          <UploadProof challengeId={c.id} />
        </GlassCard>
      ))}

      {tier === "free" && (
        <GlassCard>
          <div className="font-bold text-lg">Mehr Chaos gefällig?</div>
          <p className="text-white/75 mt-1">Hol dir VIP und bekomme 5 Challenges pro Tag.</p>
          <div className="mt-4">
            <PillButton href="/vip">✨ VIP freischalten</PillButton>
          </div>
        </GlassCard>
      )}

      {toast && (
        <div className="fixed top-5 left-0 right-0 flex justify-center px-4">
          <div className="max-w-md w-full rounded-2xl bg-black/70 backdrop-blur-md px-4 py-3 text-center text-sm">
            {toast}
            <button className="ml-3 underline text-white/80" onClick={() => setToast(null)}>ok</button>
          </div>
        </div>
      )}
    </div>
  );
}

function UploadProof({ challengeId }: { challengeId: string }) {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  async function upload() {
    if (!file) return;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setStatus("Bitte einloggen, um Beweise hochzuladen.");
      return;
    }
    setStatus("Upload...");
    const ext = file.name.split(".").pop() || "bin";
    const path = `${user.id}/${challengeId}/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("proofs").upload(path, file, { upsert: false });
    if (error) {
      setStatus("Upload fehlgeschlagen.");
      return;
    }
    await supabase.from("proofs").insert({ user_id: user.id, challenge_id: challengeId, storage_path: path });
    setStatus("Hochgeladen ✅ (du kannst es jetzt teilen)");
    setFile(null);
  }

  return (
    <div className="rounded-2xl bg-white/5 p-4">
      <div className="text-sm font-semibold mb-2">Beweis hochladen (Foto/Video)</div>
      <input
        type="file"
        accept="image/*,video/*"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        className="text-sm text-white/80"
      />
      <div className="mt-3">
        <PillButton className="text-base py-3" variant="ghost" onClick={upload} disabled={!file}>
          ⬆️ Upload
        </PillButton>
      </div>
      {status && <div className="mt-2 text-xs text-white/70">{status}</div>}
    </div>
  );
}
