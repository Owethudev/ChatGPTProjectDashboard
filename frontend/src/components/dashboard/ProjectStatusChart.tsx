
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
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
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={55}
          outerRadius={95}
          paddingAngle={3}
          label={({ percent }) => `${Math.round((percent ?? 0) * 100)}%`}
        >
          {data.map((item, index) => (
            <Cell
              key={index}
              fill={STATUS_COLORS[item.name] ?? "#94a3b8"}
            />
          ))}
        </Pie>

        <Tooltip cursor={false} 
     contentStyle={{
    backgroundColor: "#0f172a",
    border: "1px solid #334155",
    borderRadius: "10px",
    color: "#fff",
  }}
/>

        <Legend
          verticalAlign="bottom"
           formatter={(value) => {
  const item = data.find((d) => d.name === value);

  if (!item) return value;

  const percentage = Math.round((item.value / projects.length) * 100);

  return `${value} (${item.value} • ${percentage}%)`;
}} 
        />
      </PieChart>
    </ResponsiveContainer>
  );
}