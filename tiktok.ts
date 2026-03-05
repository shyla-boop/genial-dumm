/**
 * TikTok: sichere & einfache Interaktion ohne "inoffizielle" Upload APIs.
 * Wir teilen Links + öffnen die TikTok App/Web (Deep Link).
 */
export function buildTikTokShareUrl(text: string, url: string) {
  // TikTok nutzt je nach Plattform unterschiedliche Flows.
  // Für Web: einfacher "intent"-ähnlicher Share. Fallback: copy/share sheet.
  const shareText = encodeURIComponent(text);
  const shareUrl = encodeURIComponent(url);
  // Kein offizieller universal web-share endpoint dokumentiert, daher: wir nutzen Web Share API im Client.
  return `https://www.tiktok.com/`;
}
