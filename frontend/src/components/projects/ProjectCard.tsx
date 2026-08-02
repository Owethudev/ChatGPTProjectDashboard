import { Link } from "react-router-dom";
import { StatusBadge } from "../ui/StatusBadge";
import { StageTrack } from "../ui/StageTrack";
import { progressStage } from "../../utils/stage";
import type { Project } from "../../types";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white">{project.name}</h3>
          <p className="mt-2 text-sm text-slate-400">{project.description}</p>
        </div>
        <StatusBadge status={project.status} />
      </div>

      <StageTrack
        stage={progressStage(project.progress)}
        label={`${project.progress}%`}
        className="mt-4"
      />

      <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
        <span>Due {project.deadline}</span>
        <span>{project.teamMemberIds.length} team members</span>
      </div>

      <Link
        to={`/projects/${project.id}`}
        className="mt-4 inline-block text-sm font-medium text-stage-progress"
      >
        View details
      </Link>
    </article>
  );
}