import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { PageHeader } from "../components/common/PageHeader";
import { EmptyState } from "../components/common/EmptyState";
import { NeuralProjectCard } from "../components/projects/NeuralProjectCard";
import { Button } from "../components/ui/Button";
import { FilterDropdown } from "../components/ui/FilterDropdown";
import { SearchBar } from "../components/ui/SearchBar";
import { useProjects } from "../context/ProjectContext";
import type { ProjectStatus } from "../types";

type ProjectFilter = "All" | ProjectStatus;
type ProjectSort = "Newest" | "Oldest" | "Deadline" | "Name" | "Progress";

export function ProjectsPage() {
  const { projects } = useProjects();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ProjectFilter>("All");
  const [sortBy, setSortBy] = useState<ProjectSort>("Newest");
  const [selectedProjectId, setSelectedProjectId] = useState(
    projects[0]?.id ?? "",
  );
  const [positions, setPositions] = useState<
    Record<string, { x: number; y: number }>
  >({});
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);
  const workspaceRef = useRef<HTMLDivElement | null>(null);

  const visibleProjects = useMemo(() => {
    const filtered = projects.filter((project) => {
      const matchesSearch =
        project.name.toLowerCase().includes(search.toLowerCase()) ||
        project.description.toLowerCase().includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === "All" || project.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    const sorted = [...filtered].sort((left, right) => {
      switch (sortBy) {
        case "Deadline":
          return (
            new Date(left.deadline).getTime() -
            new Date(right.deadline).getTime()
          );
        case "Name":
          return left.name.localeCompare(right.name);
        case "Progress":
          return right.progress - left.progress;
        case "Oldest":
          return (
            new Date(left.createdAt).getTime() -
            new Date(right.createdAt).getTime()
          );
        case "Newest":
        default:
          return (
            new Date(right.createdAt).getTime() -
            new Date(left.createdAt).getTime()
          );
      }
    });

    return sorted;
  }, [projects, search, sortBy, statusFilter]);

  const layoutPositions = useMemo(() => {
    const nextPositions: Record<string, { x: number; y: number }> = {};
    const radius = visibleProjects.length > 4 ? 240 : 180;

    visibleProjects.forEach((project, index) => {
      const angle = (index / Math.max(visibleProjects.length, 1)) * Math.PI * 2;
      const offsetX = Math.cos(angle + index * 0.4) * radius;
      const offsetY = Math.sin(angle + index * 0.3) * (radius * 0.65);
      const jitterX = (index % 3) * 28 - 28;
      const jitterY = (index % 2) * 24 - 12;

      nextPositions[project.id] = {
        x: offsetX + jitterX,
        y: offsetY + jitterY,
      };
    });

    return nextPositions;
  }, [visibleProjects]);

  const selectedProject = useMemo(
    () =>
      visibleProjects.find((project) => project.id === selectedProjectId) ??
      visibleProjects[0],
    [selectedProjectId, visibleProjects],
  );

  const relatedProjectIds = useMemo(() => {
    if (!selectedProject) return new Set<string>();
    const selectedIndex = visibleProjects.findIndex(
      (project) => project.id === selectedProject.id,
    );
    return new Set(
      visibleProjects
        .filter((_, index) => Math.abs(index - selectedIndex) <= 2)
        .map((project) => project.id),
    );
  }, [selectedProject, visibleProjects]);

  const updatePosition = (projectId: string, x: number, y: number) => {
    setPositions((current) => ({ ...current, [projectId]: { x, y } }));
  };

  const handlePointerDown = (
    event: React.PointerEvent<HTMLDivElement>,
    projectId: string,
  ) => {
    setDraggingId(projectId);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingId || !workspaceRef.current) return;
    const bounds = workspaceRef.current.getBoundingClientRect();
    const x = event.clientX - bounds.left - bounds.width / 2;
    const y = event.clientY - bounds.top - bounds.height / 2;
    updatePosition(draggingId, x, y);
  };

  const handlePointerUp = () => {
    setDraggingId(null);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedProjectId("");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      setSelectedProjectId("");
    }
  };

  return (
    <div>
      <PageHeader
        title="Projects"
        description="Search, filter, and browse the portfolio of active initiatives."
        actions={
          <Link to="/tasks/new">
            <Button type="button" variant="secondary">
              New Task
            </Button>
          </Link>
        }
      />

      <div className="mb-6 grid gap-4 rounded-[28px] border border-white/70 bg-white/70 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.05)] backdrop-blur-2xl md:grid-cols-[2fr_1fr_1fr]">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search projects"
        />
        <FilterDropdown
          label="Status"
          value={statusFilter}
          onChange={setStatusFilter}
          options={[
            { label: "All", value: "All" },
            { label: "Active", value: "Active" },
            { label: "On Track", value: "On Track" },
            { label: "At Risk", value: "At Risk" },
            { label: "Planning", value: "Planning" },
            { label: "Completed", value: "Completed" },
            { label: "Archived", value: "Archived" },
          ]}
        />
        <FilterDropdown
          label="Sort by"
          value={sortBy}
          onChange={setSortBy}
          options={[
            { label: "Newest", value: "Newest" },
            { label: "Oldest", value: "Oldest" },
            { label: "Deadline", value: "Deadline" },
            { label: "Name", value: "Name" },
            { label: "Progress", value: "Progress" },
          ]}
        />
      </div>

      {visibleProjects.length === 0 ? (
        <EmptyState
          title="No projects found"
          description="Adjust your search or filter to see more projects."
        />
      ) : (
        <div className="relative overflow-hidden rounded-[36px] border border-white/70 bg-[radial-gradient(circle_at_top_left,_rgba(125,211,252,0.16),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(167,139,250,0.16),_transparent_24%),rgba(255,255,255,0.72)] p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
          <div className="mb-6 flex items-center justify-between rounded-[24px] border border-white/80 bg-white/70 px-4 py-3 text-sm text-slate-600">
            <span>Neural workspace • drag nodes to reorganize the map</span>
            <span>{visibleProjects.length} live projects</span>
          </div>
          <div
            ref={workspaceRef}
            className="relative h-[620px] overflow-hidden rounded-[32px] border border-white/80 bg-white/55"
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            onClick={handleOutsideClick}
          >
            <svg className="pointer-events-none absolute inset-0 h-full w-full">
              {visibleProjects.map((project) => {
                const current = positions[project.id] ??
                  layoutPositions[project.id] ?? { x: 0, y: 0 };
                const selected = selectedProject?.id === project.id;
                const nodePosition = selected ? { x: 0, y: 0 } : current;
                return visibleProjects
                  .filter((candidate) => candidate.id !== project.id)
                  .map((candidate) => {
                    const other = positions[candidate.id] ??
                      layoutPositions[candidate.id] ?? { x: 0, y: 0 };
                    return (
                      <motion.line
                        key={`${project.id}-${candidate.id}`}
                        x1={nodePosition.x + 120}
                        y1={nodePosition.y + 120}
                        x2={other.x + 120}
                        y2={other.y + 120}
                        className="neural-connector"
                        initial={{ pathLength: 0.2 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                          duration: 2.2,
                          repeat: Infinity,
                          repeatType: "reverse",
                        }}
                      />
                    );
                  });
              })}
            </svg>
            <AnimatePresence>
              {selectedProject && (
                <motion.div
                  className="absolute left-1/2 top-1/2 z-20 h-[320px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-[32px] border border-white/80 bg-white/70 p-6 shadow-[0_30px_80px_rgba(14,165,233,0.16)] backdrop-blur-2xl"
                  initial={{ scale: 0.9, opacity: 0, y: 16 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.92, opacity: 0, y: 14 }}
                  transition={{ type: "spring", stiffness: 120, damping: 18 }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-slate-500">
                        Focus node
                      </p>
                      <h3 className="mt-2 text-2xl font-semibold text-slate-900">
                        {selectedProject.name}
                      </h3>
                    </div>
                    <div className="rounded-full border border-sky-200 bg-sky-100/70 px-3 py-1 text-xs font-semibold text-sky-700">
                      {selectedProject.status}
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    {selectedProject.description}
                  </p>
                  <div className="mt-5 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
                    <div className="rounded-[18px] bg-white/70 p-3">
                      <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500">
                        Progress
                      </p>
                      <p className="mt-1 font-semibold text-slate-900">
                        {selectedProject.progress}%
                      </p>
                    </div>
                    <div className="rounded-[18px] bg-white/70 p-3">
                      <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500">
                        Priority
                      </p>
                      <p className="mt-1 font-semibold text-slate-900">
                        {selectedProject.priority}
                      </p>
                    </div>
                    <div className="rounded-[18px] bg-white/70 p-3">
                      <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500">
                        Due
                      </p>
                      <p className="mt-1 font-semibold text-slate-900">
                        {selectedProject.deadline}
                      </p>
                    </div>
                    <div className="rounded-[18px] bg-white/70 p-3">
                      <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500">
                        Team
                      </p>
                      <p className="mt-1 font-semibold text-slate-900">
                        {selectedProject.teamMemberIds.length} members
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <button className="rounded-full border border-white/80 bg-white/80 px-3 py-2 text-sm font-medium text-slate-700">
                      View Details
                    </button>
                    <button className="rounded-full border border-white/80 bg-white/80 px-3 py-2 text-sm font-medium text-slate-700">
                      Open Workspace
                    </button>
                    <button className="rounded-full border border-white/80 bg-white/80 px-3 py-2 text-sm font-medium text-slate-700">
                      Edit Project
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            {visibleProjects.map((project) => {
              const current = positions[project.id] ??
                layoutPositions[project.id] ?? { x: 0, y: 0 };
              const isSelected = selectedProject?.id === project.id;
              const isRelated = relatedProjectIds.has(project.id);
              const isDimmed =
                Boolean(selectedProject) && !isSelected && !isRelated;
              const position = isSelected ? { x: 0, y: 0 } : current;
              return (
                <motion.div
                  key={project.id}
                  onMouseEnter={() => setHoveredProjectId(project.id)}
                  onMouseLeave={() => setHoveredProjectId(null)}
                  initial={{ opacity: 0.6, scale: 0.96 }}
                  animate={{
                    opacity: isDimmed ? 0.4 : 1,
                    scale: hoveredProjectId === project.id ? 1.02 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <NeuralProjectCard
                    project={project}
                    isSelected={isSelected}
                    isRelated={isRelated}
                    isDimmed={isDimmed}
                    onSelect={(projectId) => setSelectedProjectId(projectId)}
                    position={position}
                    onPointerDown={handlePointerDown}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
