type BadgeProps = {
  label: string;
  tone?: "default" | "success" | "warning" | "danger" | "info";
};

export function Badge({ label, tone = "default" }: BadgeProps) {
  const toneClasses = {
    default: "bg-slate-800 text-slate-200",
    success: "bg-emerald-500/15 text-emerald-300",
    warning: "bg-amber-500/15 text-amber-300",
    danger: "bg-rose-500/15 text-rose-300",
    info: "bg-sky-500/15 text-sky-300",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${toneClasses[tone]}`}
    >
      {label}
    </span>
  );
}
