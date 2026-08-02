import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PageHeader } from "../components/common/PageHeader";
import { StatCard } from "../components/dashboard/StatCard";
import { Card } from "../components/ui/Card";
import { ProgressBar } from "../components/ui/ProgressBar";
import { useProjects } from "../context/ProjectContext";
import { useProjectStats } from "../hooks/useProjectStats";
import { formatDate } from "../utils/helpers";

function createLiveMetrics(base: number, drift: number) {
  return Math.max(
    1,
    Math.min(
      99,
      base + Math.floor(Math.random() * drift) - Math.floor(drift / 2),
    ),
  );
}

export function DashboardPage() {
  const { projects, tasks, activities } = useProjects();
  const stats = useProjectStats(projects, tasks);
  const [liveStats, setLiveStats] = useState({
    projects: stats.totalProjects,
    tasks: stats.totalTasks,
    completion: stats.completedPercentage,
    messages: 14,
    revenue: 12450,
    notifications: 5,
    availability: 80,
  });
  const [feed, setFeed] = useState(
    activities.slice(0, 4).map((activity) => ({ ...activity })),
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      setLiveStats((current) => ({
        ...current,
        projects: createLiveMetrics(current.projects, 2),
        tasks: createLiveMetrics(current.tasks, 3),
        completion: createLiveMetrics(current.completion, 4),
        messages: Math.max(
          10,
          current.messages + (Math.random() > 0.5 ? 1 : 0),
        ),
        revenue: current.revenue + Math.round(Math.random() * 180) - 70,
        notifications: current.notifications + (Math.random() > 0.7 ? 1 : 0),
        availability: Math.max(
          72,
          Math.min(92, current.availability + (Math.random() > 0.5 ? -1 : 1)),
        ),
      }));
      setFeed((current) => {
        const next = [
          {
            id: `${Date.now()}-${Math.random()}`,
            type: "task" as const,
            title: [
              "Project updated",
              "Task created",
              "Deadline adjusted",
              "Team synced",
            ][Math.floor(Math.random() * 4)],
            description: [
              "A live signal refreshed the workspace.",
              "New intelligence flowed through the network.",
              "Momentum shifted on the current sprint.",
              "The team just published a status update.",
            ][Math.floor(Math.random() * 4)],
            createdAt: new Date().toISOString(),
          },
          ...current,
        ].slice(0, 4);
        return next;
      });
    }, 3500);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    setLiveStats((current) => ({
      ...current,
      projects: stats.totalProjects,
      tasks: stats.totalTasks,
      completion: stats.completedPercentage,
    }));
  }, [stats.completedPercentage, stats.totalProjects, stats.totalTasks]);

  const statCards = useMemo(
    () => [
      {
        title: "Total Projects",
        value: liveStats.projects,
        subtitle: "+2 this week",
        trend: "up",
      },
      {
        title: "Tasks In Progress",
        value: Math.max(8, Math.round(liveStats.tasks * 0.6)),
        subtitle: "Neural throughput",
        trend: "up",
      },
      {
        title: "Completed Tasks",
        value: liveStats.completion,
        subtitle: "live completion",
        trend: "up",
      },
      {
        title: "Upcoming Deadlines",
        value: stats.upcomingDeadlines,
        subtitle: "next 7 days",
        trend: "steady",
      },
    ],
    [
      liveStats.completion,
      liveStats.projects,
      liveStats.tasks,
      stats.upcomingDeadlines,
    ],
  );

  return (
    <div>
      <PageHeader
        title="Good Morning, User"
        description="A calm AI workspace with live signals and soft motion."
        actions={
          <Link
            to="/projects"
            className="rounded-full border border-white/80 bg-white/70 px-4 py-2 text-sm font-medium text-slate-700 shadow-[0_16px_40px_rgba(15,23,42,0.06)]"
          >
            Open network
          </Link>
        }
      />

      <div className="mb-6 grid gap-4 rounded-[32px] border border-white/70 bg-white/70 p-4 shadow-[0_24px_70px_rgba(15,23,42,0.05)] backdrop-blur-2xl md:grid-cols-[1.4fr_0.6fr]">
        <div className="rounded-[24px] border border-white/70 bg-gradient-to-br from-sky-400/10 via-white to-violet-400/10 p-5">
          <p className="text-sm font-medium text-slate-500">Signal relay</p>
          <h3 className="mt-2 text-2xl font-semibold text-slate-900">
            Everything is breathing in sync.
          </h3>
          <p className="mt-2 max-w-xl text-sm text-slate-600">
            The home surface stays clear while live numbers flow gently without
            disrupting the experience.
          </p>
        </div>
        <div className="flex items-center justify-end gap-3">
          <div className="rounded-full border border-white/80 bg-white/70 px-4 py-2 text-sm text-slate-600 shadow-[0_10px_24px_rgba(15,23,42,0.05)]">
            🔔 {liveStats.notifications} alerts
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-violet-500 text-sm font-semibold text-white shadow-[0_16px_35px_rgba(14,165,233,0.18)]">
            U
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <StatCard
              title={card.title}
              value={String(card.value)}
              subtitle={card.subtitle}
            />
          </motion.div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <Card
          title="Project Progress"
          description="Live momentum across core initiatives."
        >
          <div className="space-y-6">
            {projects.map((project) => (
              <div key={project.id}>
                <div className="mb-3 flex items-center justify-between text-sm text-slate-600">
                  <span>{project.name}</span>
                  <span>{project.progress}%</span>
                </div>
                <ProgressBar value={project.progress} />
              </div>
            ))}
          </div>
        </Card>

        <Card
          title="Upcoming Deadlines"
          description="The next milestones coming into view."
        >
          <ul className="space-y-3 text-sm text-slate-600">
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
                  className="rounded-[20px] border border-white/80 bg-white/70 p-3"
                >
                  <div className="font-medium text-slate-900">
                    {project.name}
                  </div>
                  <div className="mt-1 text-slate-600">
                    Due {formatDate(project.deadline)}
                  </div>
                </li>
              ))}
          </ul>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card
          title="Recent Activity"
          description="Soft updates arriving from the live feed."
        >
          <div className="space-y-3">
            {feed.map((activity) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-[20px] border border-white/80 bg-white/70 p-3 text-sm text-slate-600"
              >
                <div className="font-medium text-slate-900">
                  {activity.title}
                </div>
                <div className="mt-1">{activity.description}</div>
              </motion.div>
            ))}
          </div>
        </Card>

        <div className="space-y-6">
          <Card
            title="Team Availability"
            description="A gentle read on current capacity."
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-semibold text-slate-900">
                  {liveStats.availability}%
                </div>
                <p className="mt-1 text-sm text-slate-600">
                  Ready for collaboration
                </p>
              </div>
              <div className="h-16 w-16 rounded-full border-[8px] border-sky-200 border-t-sky-500" />
            </div>
          </Card>
          <Card title="Live Metrics" description="Signals staying in motion.">
            <div className="space-y-3 text-sm text-slate-600">
              <div className="flex items-center justify-between rounded-[16px] bg-white/70 px-3 py-2">
                <span>Messages</span>
                <span className="font-semibold text-slate-900">
                  {liveStats.messages}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-[16px] bg-white/70 px-3 py-2">
                <span>Revenue</span>
                <span className="font-semibold text-slate-900">
                  ${liveStats.revenue.toLocaleString()}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
