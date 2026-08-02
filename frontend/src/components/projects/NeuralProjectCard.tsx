import { useState } from "react";
import { Link } from "react-router-dom";
import type { Project } from "../../types";

type NeuralProjectCardProps = {
  project: Project;
  isSelected: boolean;
  isRelated: boolean;
  isDimmed: boolean;
  onSelect: (projectId: string) => void;
  position: { x: number; y: number };
  onPointerDown: (
    event: React.PointerEvent<HTMLDivElement>,
    projectId: string,
  ) => void;
};

export function NeuralProjectCard({
  project,
  isSelected,
  isRelated,
  isDimmed,
  onSelect,
  position,
  onPointerDown,
}: NeuralProjectCardProps) {
  const [cursorOffset, setCursorOffset] = useState({ x: 0, y: 0 });
  const toneClass =
    project.status === "Completed"
      ? "from-emerald-400/20 to-emerald-500/5"
      : project.status === "At Risk"
        ? "from-rose-400/20 to-rose-500/5"
        : project.priority === "Critical"
          ? "from-violet-400/25 to-sky-400/10"
          : "from-sky-400/20 to-cyan-400/10";

  const resetOffset = () => setCursorOffset({ x: 0, y: 0 });

  const handleMouseMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = (event.clientX - rect.left - rect.width / 2) * 0.03;
    const offsetY = (event.clientY - rect.top - rect.height / 2) * 0.03;
    setCursorOffset({ x: offsetX, y: offsetY });
  };

  return (
    <div
      className={`neural-node absolute left-1/2 top-1/2 w-[205px] -translate-x-1/2 -translate-y-1/2 rounded-[20px] border border-white/70 bg-white/70 p-4 shadow-[0_16px_50px_rgba(15,23,42,0.08)] backdrop-blur-2xl transition-transform duration-200 ${
        isSelected ? "ring-2 ring-sky-300/70" : ""
      } ${isRelated ? "shadow-[0_18px_60px_rgba(56,189,248,0.18)]" : ""}`}
      style={{
        transform: `translate(${position.x + cursorOffset.x}px, ${position.y + cursorOffset.y}px) scale(${isSelected ? 1.03 : 1})`,
        transition: "transform 180ms ease-out",
        opacity: isDimmed ? 0.4 : 1,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetOffset}
      onPointerDown={(event) => {
        resetOffset();
        onPointerDown(event, project.id);
      }}
      onClick={() => {
        resetOffset();
        onSelect(project.id);
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          resetOffset();
          onSelect(project.id);
        }
      }}
    >
      <div
        className={`absolute inset-0 rounded-[20px] bg-gradient-to-br ${toneClass}`}
      />
      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-slate-500">
              {project.status}
            </p>
            <h3 className="mt-2 text-[15px] font-semibold text-slate-900">
              {project.name}
            </h3>
          </div>
          <div className="rounded-full border border-white/80 bg-white/70 px-2.5 py-1 text-[11px] font-semibold text-slate-700">
            {project.progress}%
          </div>
        </div>
        <p className="mt-2 text-xs leading-5 text-slate-600">
          {project.description}
        </p>
        <div className="mt-3 h-2 rounded-full bg-slate-200/80">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-sky-500 via-violet-500 to-cyan-400"
            style={{ width: `${project.progress}%` }}
          />
        </div>
        <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
          <span>Due {project.deadline}</span>
          <Link
            to={`/projects/${project.id}`}
            className="font-medium text-slate-900"
            onClick={(event) => event.stopPropagation()}
          >
            Open
          </Link>
        </div>
      </div>
    </div>
  );
}
