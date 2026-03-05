import { clsx } from "clsx";

export function GlassCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={clsx("rounded-3xl bg-[color:var(--card)] backdrop-blur-md p-5 shadow-glow", className)}>
      {children}
    </div>
  );
}
