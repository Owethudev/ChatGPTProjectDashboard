import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
} from "recharts";

type Props = {
  completed: number;
  remaining: number;
};

export function TaskCompletionChart({
  completed,
  remaining,
}: Props) {
  const data = [
    {
      name: "Completed",
      value: completed,
    },
    {
      name: "Remaining",
      value: remaining,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data}>
  <XAxis dataKey="name" />

  <Tooltip
    cursor={false}
    contentStyle={{
      backgroundColor: "#0f172a",
      border: "1px solid #334155",
      borderRadius: "10px",
      color: "#fff",
    }}
  />

  <Bar
    dataKey="value"
    fill="#3b82f6"
    radius={[8, 8, 0, 0]}
  />
    </BarChart>
    </ResponsiveContainer>
  );
}