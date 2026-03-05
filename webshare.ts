"use client";

export async function shareOrCopy(payload: { title: string; text: string; url: string }) {
  try {
    // Web Share API (Mobile Browser / PWA)
    // @ts-expect-error navigator.share exists on mobile
    if (navigator.share) {
      // @ts-expect-error
      await navigator.share(payload);
      return { ok: true as const, method: "share" as const };
    }
  } catch {
    // ignore -> fallback copy
  }

  try {
    await navigator.clipboard.writeText(`${payload.text}\n${payload.url}`);
    return { ok: true as const, method: "copy" as const };
  } catch {
    return { ok: false as const };
  }
}
