import { useState } from "react";
import type { Task } from "../../types";

type NeuralTaskCardProps = {
  task: Task;
  isSelected: boolean;
  position: { x: number; y: number };
  onPointerDown: (
    event: React.PointerEvent<HTMLDivElement>,
    taskId: string,
  ) => void;
  onSelect: (taskId: string) => void;
};

export function NeuralTaskCard({
  task,
  isSelected,
  position,
  onPointerDown,
  onSelect,
}: NeuralTaskCardProps) {
  const [cursorOffset, setCursorOffset] = useState({ x: 0, y: 0 });
  const statusTone =
    task.status === "Completed"
      ? "border-emerald-300/70 bg-emerald-400/15 text-emerald-700"
      : task.status === "In Progress"
        ? "border-sky-300/70 bg-sky-400/15 text-sky-700"
        : task.priority === "Critical" || task.priority === "High"
          ? "border-violet-300/70 bg-violet-400/15 text-violet-700"
          : "border-slate-300/70 bg-white/70 text-slate-700";

  const resetOffset = () => setCursorOffset({ x: 0, y: 0 });

  const handleMouseMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = (event.clientX - rect.left - rect.width / 2) * 0.025;
    const offsetY = (event.clientY - rect.top - rect.height / 2) * 0.025;
    setCursorOffset({ x: offsetX, y: offsetY });
  };

  return (
    <div
      className="absolute left-1/2 top-1/2 w-[180px] -translate-x-1/2 -translate-y-1/2 rounded-[18px] border border-white/70 bg-white/80 p-3 shadow-[0_16px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-transform duration-200"
      style={{
        transform: `translate(${position.x + cursorOffset.x}px, ${position.y + cursorOffset.y}px) scale(${isSelected ? 1.03 : 1})`,
        transition: "transform 180ms ease-out",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetOffset}
      onPointerDown={(event) => {
        resetOffset();
        onPointerDown(event, task.id);
      }}
      onClick={() => {
        resetOffset();
        onSelect(task.id);
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          resetOffset();
          onSelect(task.id);
        }
      }}
    >
      <div
        className={`rounded-full border px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.25em] ${statusTone}`}
      >
        {task.status}
      </div>
      <h3 className="mt-2 text-sm font-semibold text-slate-900">
        {task.title}
      </h3>
      <p className="mt-2 text-xs leading-5 text-slate-600">
        {task.description}
      </p>
      <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
        <span>{task.priority}</span>
        <span>{task.dueDate}</span>
      </div>
    </div>
  );
}
