import type { ProjectStatus, TaskStatus } from "../types";

export const STAGE_ORDER = [
  "To Do",
  "In Progress",
  "In Review",
  "Completed",
] as const;

export type Stage = (typeof STAGE_ORDER)[number];

type StageClassSet = { bg: string; softBg: string; text: string; border: string };

const STAGE_CLASSES: Record<Stage, StageClassSet> = {
  "To Do": {
    bg: "bg-stage-todo",
    softBg: "bg-stage-todo-soft",
    text: "text-stage-todo",
    border: "border-stage-todo",
  },
  "In Progress": {
    bg: "bg-stage-progress",
    softBg: "bg-stage-progress-soft",
    text: "text-stage-progress",
    border: "border-stage-progress",
  },
  "In Review": {
    bg: "bg-stage-review",
    softBg: "bg-stage-review-soft",
    text: "text-stage-review",
    border: "border-stage-review",
  },
  Completed: {
    bg: "bg-stage-done",
    softBg: "bg-stage-done-soft",
    text: "text-stage-done",
    border: "border-stage-done",
  },
};

export function taskStage(status: TaskStatus): Stage {
  return status;
}

export function projectStage(status: ProjectStatus): Stage {
  switch (status) {
    case "Completed":
    case "Archived":
      return "Completed";
    case "At Risk":
      return "In Review";
    case "Planning":
      return "To Do";
    case "Active":
    case "On Track":
    default:
      return "In Progress";
  }
}

export function progressStage(value: number): Stage {
  if (value >= 100) return "Completed";
  if (value >= 66) return "In Review";
  if (value >= 33) return "In Progress";
  return "To Do";
}

export function stageClasses(stage: Stage): StageClassSet {
  return STAGE_CLASSES[stage];
}