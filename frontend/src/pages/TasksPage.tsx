import { motion } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { PageHeader } from "../components/common/PageHeader";
import { NeuralTaskCard } from "../components/tasks/NeuralTaskCard";
import { Button } from "../components/ui/Button";
import { useProjects } from "../context/ProjectContext";

export function TasksPage() {
  const { tasks } = useProjects();
  const [selectedTaskId, setSelectedTaskId] = useState(tasks[0]?.id ?? "");
  const [positions, setPositions] = useState<
    Record<string, { x: number; y: number }>
  >({});
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const workspaceRef = useRef<HTMLDivElement | null>(null);

  const visibleTasks = useMemo(() => tasks.slice(0, 8), [tasks]);

  const layoutPositions = useMemo(() => {
    const nextPositions: Record<string, { x: number; y: number }> = {};
    const radius = visibleTasks.length > 5 ? 220 : 160;

    visibleTasks.forEach((task, index) => {
      const angle = (index / Math.max(visibleTasks.length, 1)) * Math.PI * 2;
      const offsetX = Math.cos(angle + index * 0.35) * radius;
      const offsetY = Math.sin(angle + index * 0.2) * (radius * 0.7);
      const jitterX = (index % 4) * 22 - 33;
      const jitterY = (index % 3) * 18 - 18;

      nextPositions[task.id] = {
        x: offsetX + jitterX,
        y: offsetY + jitterY,
      };
    });

    return nextPositions;
  }, [visibleTasks]);

  const selectedTask = useMemo(
    () =>
      visibleTasks.find((task) => task.id === selectedTaskId) ??
      visibleTasks[0],
    [selectedTaskId, visibleTasks],
  );

  const handlePointerDown = (
    event: React.PointerEvent<HTMLDivElement>,
    taskId: string,
  ) => {
    setDraggingId(taskId);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingId || !workspaceRef.current) return;
    const bounds = workspaceRef.current.getBoundingClientRect();
    const x = event.clientX - bounds.left - bounds.width / 2;
    const y = event.clientY - bounds.top - bounds.height / 2;
    setPositions((current) => ({ ...current, [draggingId]: { x, y } }));
  };

  const handlePointerUp = () => {
    setDraggingId(null);
  };

  return (
    <div>
      <PageHeader
        title="Tasks"
        description="A living task network where priorities, blockers, and progress pulse together."
        actions={
          <Link to="/tasks/new">
            <Button type="button" variant="secondary">
              New Task
            </Button>
          </Link>
        }
      />

      <div className="relative overflow-hidden rounded-[36px] border border-white/70 bg-[radial-gradient(circle_at_top_left,_rgba(125,211,252,0.16),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(167,139,250,0.16),_transparent_24%),rgba(255,255,255,0.74)] p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
        <div className="mb-6 flex items-center justify-between rounded-[24px] border border-white/80 bg-white/70 px-4 py-3 text-sm text-slate-600">
          <span>Neural task mesh • connected work pulses in real time</span>
          <span>{visibleTasks.length} active nodes</span>
        </div>
        <div
          ref={workspaceRef}
          className="relative h-[620px] overflow-hidden rounded-[32px] border border-white/80 bg-white/55"
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          <svg className="pointer-events-none absolute inset-0 h-full w-full">
            {visibleTasks.map((task) => {
              const current = positions[task.id] ??
                layoutPositions[task.id] ?? { x: 0, y: 0 };
              return visibleTasks
                .filter((candidate) => candidate.id !== task.id)
                .map((candidate) => {
                  const other = positions[candidate.id] ??
                    layoutPositions[candidate.id] ?? { x: 0, y: 0 };
                  return (
                    <motion.line
                      key={`${task.id}-${candidate.id}`}
                      x1={current.x + 110}
                      y1={current.y + 110}
                      x2={other.x + 110}
                      y2={other.y + 110}
                      className="neural-connector"
                      initial={{ pathLength: 0.25 }}
                      animate={{ pathLength: 1 }}
                      transition={{
                        duration: 2.6,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    />
                  );
                });
            })}
          </svg>
          {selectedTask && (
            <motion.div
              className="absolute left-1/2 top-1/2 h-[240px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-[32px] border border-white/80 bg-gradient-to-br from-sky-300/20 via-white to-violet-300/20 p-6 shadow-[0_30px_80px_rgba(14,165,233,0.12)] backdrop-blur-2xl"
              animate={{ scale: selectedTask ? 1 : 0.96, opacity: 1 }}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-500">
                Selected task
              </p>
              <h3 className="mt-3 text-xl font-semibold text-slate-900">
                {selectedTask.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {selectedTask.description}
              </p>
              <div className="mt-6 rounded-[20px] bg-white/70 px-3 py-2 text-sm text-slate-600">
                {selectedTask.priority} • {selectedTask.status}
              </div>
            </motion.div>
          )}
          {visibleTasks.map((task) => {
            const current = positions[task.id] ??
              layoutPositions[task.id] ?? { x: 0, y: 0 };
            const isSelected = selectedTask?.id === task.id;
            return (
              <NeuralTaskCard
                key={task.id}
                task={task}
                isSelected={isSelected}
                onSelect={setSelectedTaskId}
                position={isSelected ? { x: 0, y: 0 } : current}
                onPointerDown={handlePointerDown}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
