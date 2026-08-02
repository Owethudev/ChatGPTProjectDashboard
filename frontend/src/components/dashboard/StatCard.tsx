import { Card } from "../ui/Card";

type StatCardProps = {
  title: string;
  value: string;
  subtitle?: string;
};

export function StatCard({ title, value, subtitle }: StatCardProps) {
  return (
    <Card className="floating-panel">
      <p className="text-sm text-slate-500">{title}</p>
      <p className="mt-3 text-3xl font-semibold text-slate-900">{value}</p>
      {subtitle && <p className="mt-2 text-sm text-slate-600">{subtitle}</p>}
    </Card>
  );
}
