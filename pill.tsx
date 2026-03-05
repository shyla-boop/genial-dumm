import { clsx } from "clsx";

export function PillButton(props: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  disabled?: boolean;
}) {
  const { children, onClick, href, variant = "primary", className, disabled } = props;

  const base =
    "w-full rounded-full py-4 px-6 text-center font-extrabold tracking-wide text-xl shadow-glow active:scale-[0.99] transition";
  const v =
    variant === "primary"
      ? "bg-[color:var(--pill)]/95"
      : variant === "secondary"
      ? "bg-[color:var(--pill2)]/90"
      : "bg-white/10";

  if (href) {
    return (
      <a
        className={clsx(base, v, disabled && "opacity-60 pointer-events-none", className)}
        href={href}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={clsx(base, v, disabled && "opacity-60", className)}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
