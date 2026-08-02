type BadgeProps = {
  label: string;
  tone?: "default" | "success" | "warning" | "danger" | "info";
};

export function Badge({ label, tone = "default" }: BadgeProps) {
  const toneClasses = {
    default: "bg-white/80 text-slate-700",
    success: "bg-emerald-500/15 text-emerald-700",
    warning: "bg-amber-500/15 text-amber-700",
    danger: "bg-rose-500/15 text-rose-700",
    info: "bg-sky-500/15 text-sky-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${toneClasses[tone]}`}
    >
      {label}
    </span>
  );
}
