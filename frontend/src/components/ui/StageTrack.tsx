import { STAGE_ORDER, stageClasses, type Stage } from "../../utils/stage";

type StageTrackProps = {
  stage: Stage;
  /** Optional numeric label, e.g. "72%" or a due date. */
  label?: string;
  className?: string;
};

/**
 * Renders the four pipeline stages (To Do -> In Progress -> In Review ->
 * Completed) as segments, filled up to the current stage. Used anywhere
 * progress or status would otherwise be a plain percentage bar, so a
 * project's completion and a task's status read as the same visual idea.
 */
export function StageTrack({ stage, label, className = "" }: StageTrackProps) {
  const currentIndex = STAGE_ORDER.indexOf(stage);

  return (
    <div className={className}>
      <div className="flex items-center gap-1.5" role="img" aria-label={`Stage: ${stage}`}>
        {STAGE_ORDER.map((s, index) => {
          const reached = index <= currentIndex;
          const classes = stageClasses(s);
          return (
            <div
              key={s}
              className={`h-1.5 flex-1 rounded-full ${
                reached ? classes.bg : "bg-slate-800"
              }`}
            />
          );
        })}
      </div>
      <div className="mt-1.5 flex items-center justify-between text-xs text-slate-500">
        <span>{stage}</span>
        {label && <span>{label}</span>}
      </div>
    </div>
  );
}