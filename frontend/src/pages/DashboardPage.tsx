import { Link, useNavigate } from "react-router-dom";
import { PageHeader } from "../components/common/PageHeader";
import { StatCard } from "../components/dashboard/StatCard";
import { Card } from "../components/ui/Card";
import { ProgressBar } from "../components/ui/ProgressBar";
import { useProjects } from "../context/ProjectContext";
import { useProjectStats } from "../hooks/useProjectStats";
import { formatDate } from "../utils/helpers";

export function DashboardPage() {
  const navigate = useNavigate();

  const { projects, tasks, activities } = useProjects();
  const stats = useProjectStats(projects, tasks);

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="A real-time snapshot of delivery health, tasks, and project momentum."
        actions={
          <Link
            to="/projects"
            className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-200 transition-all duration-200 hover:scale-105 hover:bg-slate-800"
          >
            📁 View Projects →
          </Link>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Projects"
          value={String(stats.totalProjects)}
          subtitle="Portfolio overview"
          onClick={() => navigate("/projects")}
        />

        <StatCard
          title="Active Projects"
          value={String(stats.activeProjects)}
          subtitle="Currently in progress"
          onClick={() => navigate("/projects")}
        />

        <StatCard
          title="Completed Projects"
          value={String(stats.completedProjects)}
          subtitle="Delivered items"
          onClick={() => navigate("/projects")}
        />

        <StatCard
          title="Total Tasks"
          value={String(stats.totalTasks)}
          subtitle="Tracked work items"
          onClick={() => navigate("/tasks")}
        />
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Completed Tasks"
          value={String(stats.completedTasks)}
          subtitle={`${stats.completedPercentage}% complete`}
          onClick={() => navigate("/tasks")}
        />

        <StatCard
          title="Overdue Tasks"
          value={String(stats.overdueTasks)}
          subtitle="Past due"
          onClick={() => navigate("/tasks")}
        />

        <StatCard
          title="Upcoming Deadlines"
          value={String(stats.upcomingDeadlines)}
          subtitle="Next 7 days"
        />

        <StatCard
          title="Overall Progress"
          value={`${stats.overallProgress}%`}
          subtitle="Average project progress"
        />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <Card
          title="Progress Overview"
          description="Current project completion by initiative."
        >
          <div className="space-y-6">
            {projects.map((project) => (
              <div key={project.id}>
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-white">
                      {project.name}
                    </div>
                    <div className="text-xs text-slate-500">
                      {project.status}
                    </div>
                  </div>

                  <span className="text-sm text-slate-300">
                    {project.progress}%
                  </span>
                </div>

                <div className="transition-all duration-700 ease-out">
                  <ProgressBar value={project.progress} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card
          title="Upcoming Deadlines"
          description="Projects due soon."
        >
          <ul className="space-y-3 text-sm text-slate-300">
            {projects
              .slice()
              .sort(
                (a, b) =>
                  new Date(a.deadline).getTime() -
                  new Date(b.deadline).getTime(),
              )
              .slice(0, 4)
              .map((project) => (
                <li
                  key={project.id}
                  onClick={() => navigate(`/projects/${project.id}`)}
                  className="cursor-pointer rounded-xl border border-slate-800 bg-slate-950/60 p-3 transition-all duration-200 hover:-translate-y-1 hover:border-sky-500/40 hover:bg-slate-900"
                >
                  <div className="font-medium text-white">
                    {project.name}
                  </div>

                  <div className="mt-1 text-slate-400">
                    Due {formatDate(project.deadline)}
                  </div>
                </li>
              ))}
          </ul>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card
          title="Recent Activity"
          description="The latest changes across projects and tasks."
        >
          <div className="space-y-3">
            {activities.length === 0 ? (
              <div className="py-8 text-center text-slate-500">
                No recent activity.
              </div>
            ) : (
              activities.slice(0, 5).map((activity) => (
                <div
                  key={activity.id}
                  className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-sm text-slate-300 transition-all duration-200 hover:-translate-y-1"
                >
                  <div className="font-medium text-white">
                    {activity.title}
                  </div>

                  <div className="mt-1">
                    {activity.description}
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        <Card
          title="Recent Projects"
          description="Most recently updated workstreams."
        >
          <div className="space-y-3">
            {projects.length === 0 ? (
              <div className="py-8 text-center text-slate-500">
                No projects available.
              </div>
            ) : (
              projects.slice(0, 4).map((project) => (
                <div
                  key={project.id}
                  onClick={() => navigate(`/projects/${project.id}`)}
                  className="cursor-pointer rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-sm text-slate-300 transition-all duration-200 hover:-translate-y-1 hover:border-sky-500/40 hover:bg-slate-900"
                >
                  <div className="font-medium text-white">
                    {project.name}
                  </div>

                  <div className="mt-1">
                    {project.status} • {project.progress}%
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}