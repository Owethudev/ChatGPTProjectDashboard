import { Card } from "../ui/Card";

type StatCardProps = {
  title: string;
  value: string;
  subtitle?: string;
  onClick?: () => void;
  className?: string;
};

export function StatCard({
  title,
  value,
  subtitle,
  onClick,
  className = "",
}: StatCardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        ${onClick ? "cursor-pointer" : ""}
        ${className}
      `}
    >
      <Card
        className="
          transition-all
          duration-200
          hover:-translate-y-1
          hover:shadow-lg
          hover:border-sky-500/40
        "
      >
        <p className="text-sm text-slate-400">{title}</p>

        <p className="mt-3 text-3xl font-semibold text-white">
          {value}
        </p>

        {subtitle && (
          <p className="mt-2 text-sm text-slate-500">
            {subtitle}
          </p>
        )}
      </Card>
    </div>
  );
}