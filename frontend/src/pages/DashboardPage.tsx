import { Link } from "react-router-dom";
import { PageHeader } from "../components/common/PageHeader";
import { StatCard } from "../components/dashboard/StatCard";
import { Card } from "../components/ui/Card";
import { ProgressBar } from "../components/ui/ProgressBar";
import { useProjects } from "../context/ProjectContext";
import { useProjectStats } from "../hooks/useProjectStats";
import { formatDate } from "../utils/helpers";
import { ProjectStatusChart } from "../components/dashboard/ProjectStatusChart";
import { TaskCompletionChart } from "../components/dashboard/TaskCompletionChart";

export function DashboardPage() {
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
            className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-800"
          >
            View projects
          </Link>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Projects"
          value={String(stats.totalProjects)}
          subtitle="Portfolio overview"
        />
        <StatCard
          title="Active Projects"
          value={String(stats.activeProjects)}
          subtitle="Currently in progress"
        />
        <StatCard
          title="Completed Projects"
          value={String(stats.completedProjects)}
          subtitle="Delivered items"
        />
        <StatCard
          title="Total Tasks"
          value={String(stats.totalTasks)}
          subtitle="Tracked work items"
        />
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Completed Tasks"
          value={String(stats.completedTasks)}
          subtitle={`${stats.completedPercentage}% complete`}
        />
        <StatCard
          title="Overdue Tasks"
          value={String(stats.overdueTasks)}
          subtitle="Past due"
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
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
  <Card
    title="Project Status"
    description="Distribution of projects by current status."
  >
    <ProjectStatusChart projects={projects} />
  </Card>

  <Card
    title="Task Completion"
    description="Completed vs remaining tasks."
  >
    <TaskCompletionChart
      completed={stats.completedTasks}
      remaining={stats.totalTasks - stats.completedTasks}
    />
  </Card>
</div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <Card
          title="Progress Overview"
          description="Current project completion by initiative."
        >
          <div className="space-y-6">
            {projects.map((project) => (
              <div key={project.id}>
                <div className="mb-3 flex items-center justify-between text-sm text-slate-300">
                  <span>{project.name}</span>
                  <span>{project.progress}%</span>
                </div>
                <ProgressBar value={project.progress} />
              </div>
            ))}
          </div>
        </Card>

        <Card title="Upcoming Deadlines" description="Projects due soon.">
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
                  className="rounded-xl border border-slate-800 bg-slate-950/60 p-3"
                >
                  <div className="font-medium text-white">{project.name}</div>
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
            {activities.slice(0, 5).map((activity) => (
              <div
                key={activity.id}
                className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-sm text-slate-300"
              >
                <div className="font-medium text-white">{activity.title}</div>
                <div className="mt-1">{activity.description}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card
          title="Recent Projects"
          description="Most recently updated workstreams."
        >
          <div className="space-y-3">
            {projects.slice(0, 4).map((project) => (
              <div
                key={project.id}
                className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-sm text-slate-300"
              >
                <div className="font-medium text-white">{project.name}</div>
                <div className="mt-1">
                  {project.status} • {project.progress}%
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
