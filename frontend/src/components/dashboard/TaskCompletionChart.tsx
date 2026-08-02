import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

type Props = {
  completed: number;
  remaining: number;
};

const COLORS = ["#10b981", "#ef4444"];

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
      name: "Open Tasks",
      value: remaining,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={380}>
      <BarChart
        data={data}
        margin={{
          top: 25,
          right: 10,
          left: -15,
          bottom: 10,
        }}
        barCategoryGap={20}
      >
        <CartesianGrid
          stroke="#334155"
          strokeDasharray="3 3"
          vertical={false}
        />

        <XAxis
          dataKey="name"
          tick={{ fill: "#cbd5e1", fontSize: 13 }}
          axisLine={{ stroke: "#334155" }}
          tickLine={{ stroke: "#334155" }}
        />

        <YAxis
          allowDecimals={false}
          tick={{ fill: "#94a3b8", fontSize: 12 }}
          axisLine={{ stroke: "#334155" }}
          tickLine={{ stroke: "#334155" }}
        />

        <Tooltip
          cursor={false}
          contentStyle={{
            backgroundColor: "#0f172a",
            border: "1px solid #334155",
            borderRadius: 12,
            color: "#f8fafc",
          }}
          labelStyle={{
            color: "#f8fafc",
            fontWeight: 600,
          }}
          itemStyle={{
            color: "#cbd5e1",
          }}
        />

        <Bar
          dataKey="value"
          radius={[8, 8, 0, 0]}
          label={{
            position: "top",
            fill: "#f8fafc",
            fontSize: 13,
          }}
        >
          {data.map((_, index) => (
            <Cell
              key={index}
              fill={COLORS[index]}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}