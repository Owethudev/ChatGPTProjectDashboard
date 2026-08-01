import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PageHeader } from "../components/common/PageHeader";
import { ProjectCard } from "../components/projects/ProjectCard";
import { Button } from "../components/ui/Button";
import { EmptyState } from "../components/common/EmptyState";
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

      <div className="mb-6 grid gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 md:grid-cols-[2fr_1fr_1fr]">
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
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {visibleProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
