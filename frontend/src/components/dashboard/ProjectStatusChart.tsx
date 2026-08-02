
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { Project } from "../../types";

type Props = {
  projects: Project[];
};

const STATUS_COLORS: Record<string, string> = {
  Active: "#3b82f6",
  "On Track": "#22c55e",
  Planning: "#8b5cf6",
  "At Risk": "#f59e0b",
  Completed: "#10b981",
  Archived: "#64748b",
};

export function ProjectStatusChart({ projects }: Props) {
  if (projects.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-slate-400">
        No project data available.
      </div>
    );
  }

  const counts = projects.reduce<Record<string, number>>((acc, project) => {
    acc[project.status] = (acc[project.status] || 0) + 1;
    return acc;
  }, {});

  //const total = projects.length;

  const data = Object.entries(counts).map(([name, value]) => ({
    name,
    value,
  }));

  return (
  <div className="space-y-4">
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={55}
          outerRadius={95}
          paddingAngle={3}
          label={false}
        >
          {data.map((item, index) => (
            <Cell
              key={index}
              fill={STATUS_COLORS[item.name] ?? "#94a3b8"}
            />
          ))}
        </Pie>

        <Tooltip cursor={false} />
      </PieChart>
    </ResponsiveContainer>

    <div className="space-y-2">
      {data.map((item) => {
        const percentage = Math.round(
          (item.value / projects.length) * 100,
        );

        return (
          <div
            key={item.name}
            className="flex items-center justify-between rounded-lg bg-slate-950/40 px-3 py-2"
          >
            <div className="flex items-center gap-3">
              <span
                className="h-3 w-3 rounded-full"
                style={{
                  backgroundColor:
                    STATUS_COLORS[item.name] ?? "#94a3b8",
                }}
              />
              <span className="text-sm text-slate-300">
                {item.name}
              </span>
            </div>

            <span className="text-sm font-medium text-white">
              {item.value} ({percentage}%)
            </span>
          </div>
        );
      })}
    </div>
  </div>
);
}