import type { ProjectStatus, TaskStatus } from "../../types";
import { projectStage, taskStage, stageClasses } from "../../utils/stage";

type StatusBadgeProps = {
  status: ProjectStatus | TaskStatus;
};

const TASK_STATUSES: TaskStatus[] = [
  "To Do",
  "In Progress",
  "In Review",
  "Completed",
];

export function StatusBadge({ status }: StatusBadgeProps) {
  const stage = TASK_STATUSES.includes(status as TaskStatus)
    ? taskStage(status as TaskStatus)
    : projectStage(status as ProjectStatus);
  const classes = stageClasses(stage);

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${classes.softBg} ${classes.text}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${classes.bg}`} />
      {status}
    </span>
  );
}