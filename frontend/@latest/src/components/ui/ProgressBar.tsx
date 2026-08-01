import { progressStage, stageClasses } from "../../utils/stage";

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
  const classes = stageClasses(progressStage(value));

  return (
    <div className={className}>
      {label && (
        <div className="mb-2 flex items-center justify-between text-sm text-slate-400">
          <span>{label}</span>
          <span>{value}%</span>
        </div>
      )}
      <div className="h-2 rounded-full bg-slate-800">
        <div
          className={`h-2 rounded-full ${classes.bg}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}