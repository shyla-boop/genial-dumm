"use client";

import { usePathname } from "next/navigation";
import { clsx } from "clsx";

const items = [
  { href: "/", label: "Start", icon: "⌂" },
  { href: "/challenge", label: "Challenge", icon: "⚡" },
  { href: "/favorites", label: "Favoriten", icon: "❤" },
  { href: "/settings", label: "Einstellungen", icon: "⚙" },
];

export function Nav() {
  const path = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black/55 backdrop-blur-md border-t border-white/10">
      <div className="mx-auto max-w-md px-6 py-3 safe-area">
        <div className="flex justify-between">
          {items.map((it) => {
            const active = path === it.href;
            return (
              <a
                key={it.href}
                href={it.href}
                className={clsx(
                  "flex flex-col items-center gap-1 text-xs font-semibold",
                  active ? "text-white" : "text-white/70"
                )}
              >
                <span className={clsx("text-lg", active && "drop-shadow")}>{it.icon}</span>
                <span>{it.label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
