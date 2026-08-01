import { Link } from "react-router-dom";
import { Badge } from "../ui/Badge";
import type { Project } from "../../types";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const toneMap: Record<
    Project["status"],
    "success" | "warning" | "info" | "default"
  > = {
    Active: "info",
    "On Track": "success",
    "At Risk": "warning",
    Planning: "info",
    Completed: "default",
    Archived: "default",
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
      <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-slate-400">
        <span>{project.progress}% complete</span>
        <span>•</span>
        <span>Due {project.deadline}</span>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-slate-400">
          {project.teamMemberIds.length} team members
        </span>
        <Link
          to={`/projects/${project.id}`}
          className="text-sm font-medium text-sky-300"
        >
          View details
        </Link>
      </div>
    </article>
  );
}
