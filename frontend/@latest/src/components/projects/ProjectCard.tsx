import { Badge } from "../ui/Badge";
import type { Project } from "../../types";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const toneMap = {
    "On Track": "success" as const,
    "At Risk": "warning" as const,
    Planning: "info" as const,
    Completed: "default" as const,
  };

  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white">{project.name}</h3>
          <p className="mt-2 text-sm text-slate-400">{project.description}</p>
        </div>
        <Badge label={project.status} tone={toneMap[project.status]} />
      </div>
      <div className="mt-5 flex items-center justify-between text-sm text-slate-400">
        <span>Owner: {project.owner}</span>
        <span>Due: {project.deadline}</span>
      </div>
    </article>
  );
}
