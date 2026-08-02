type ProgressBarProps = {
  value: number;
  label?: string;
  className?: string;
};

export function ProgressBar({
  value,
  label,
  className = "",
}: ProgressBarProps) {
  return (
    <div className={className}>
      {label && (
        <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
          <span>{label}</span>
          <span>{value}%</span>
        </div>
      )}
      <div className="h-2 rounded-full bg-slate-200/80">
        <div
          className="h-2 rounded-full bg-gradient-to-r from-sky-500 via-violet-500 to-cyan-400"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
