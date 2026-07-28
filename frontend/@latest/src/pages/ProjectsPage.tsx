import { PageHeader } from "../components/common/PageHeader";
import { ProjectCard } from "../components/projects/ProjectCard";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select";
import type { Project } from "../types";

type ProjectsPageProps = {
  onNewProject: () => void;
};

const projects: Project[] = [
  {
    name: "Northstar Rebrand",
    status: "On Track",
    owner: "Alicia",
    description: "Placeholder project summary for future content integration.",
    deadline: "Aug 20",
  },
  {
    name: "Mobile App Sprint",
    status: "At Risk",
    owner: "Marcus",
    description: "Visual skeleton for a roadmap and delivery overview.",
    deadline: "Sep 01",
  },
  {
    name: "Analytics Upgrade",
    status: "Planning",
    owner: "Priya",
    description: "Static card layout ready for real project data.",
    deadline: "Sep 15",
  },
];

export function ProjectsPage({ onNewProject }: ProjectsPageProps) {
  return (
    <div>
      <PageHeader
        title="Projects"
        description="A responsive project library layout ready for filtering and search integration."
        actions={
          <Button type="button" variant="secondary" onClick={onNewProject}>
            New Project
          </Button>
        }
      />

      <div className="mb-6 grid gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 md:grid-cols-[2fr_1fr_1fr]">
        <Input label="Search projects" placeholder="Search placeholder" />
        <Select label="Status" placeholder="All statuses" />
        <Select label="Owner" placeholder="Any owner" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>

      {/* Functionality Team: Connect the search input and filters to project filtering logic. */}
      {/* Functionality Team: Populate this grid with fetched project data from the API. */}
    </div>
  );
}
