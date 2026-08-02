import { Link, useNavigate } from "react-router-dom";
import { StatusBadge } from "../ui/StatusBadge";
import { StageTrack } from "../ui/StageTrack";
import { progressStage } from "../../utils/stage";
import type { Project } from "../../types";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const navigate = useNavigate();

  return (
    <article
      onClick={() => navigate(`/projects/${project.id}`)}
      className="
        rounded-2xl
        border
        border-slate-800
        bg-slate-900/70
        p-5
        shadow-sm
        cursor-pointer
        transition-all
        duration-200
        hover:-translate-y-1
        hover:border-stage-progress/40
        hover:shadow-xl
      "
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white">
            {project.name}
          </h3>

          <p className="mt-2 line-clamp-2 text-sm text-slate-400">
            {project.description}
          </p>
        </div>

        <StatusBadge status={project.status} />
      </div>

      <div className="mt-4 transition-all duration-700 ease-out">
        <StageTrack
          stage={progressStage(project.progress)}
          label={`${project.progress}%`}
        />
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
        <span>📅 Due {project.deadline}</span>
        <span>👥 {project.teamMemberIds.length} team members</span>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <Link
          to={`/projects/${project.id}`}
          onClick={(e) => e.stopPropagation()}
          className="
            text-sm
            font-medium
            text-stage-progress
            transition-colors
            hover:text-white
          "
        >
          View details →
        </Link>

        <span className="text-xs text-slate-500">
          Click card to open
        </span>
      </div>
    </article>
  );
}