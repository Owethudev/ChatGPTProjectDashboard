import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md";
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  const baseClasses =
    "rounded-full border font-medium transition focus:outline-none focus:ring-2 focus:ring-sky-400/40 focus:ring-offset-2 focus:ring-offset-white";
  const variantClasses = {
    primary:
      "border-sky-300/70 bg-gradient-to-r from-sky-500/90 to-violet-500/85 text-white shadow-[0_16px_35px_rgba(14,165,233,0.18)] hover:from-sky-400 hover:to-violet-400",
    secondary: "border-white/80 bg-white/70 text-slate-700 hover:bg-white/90",
    ghost:
      "border-transparent bg-transparent text-slate-600 hover:bg-white/70 hover:text-slate-900",
  };
  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5 text-sm",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
