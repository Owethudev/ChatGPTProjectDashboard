import { PageHeader } from "../components/common/PageHeader";
import { StatCard } from "../components/dashboard/StatCard";
import { Card } from "../components/ui/Card";
import { ProgressBar } from "../components/ui/ProgressBar";

type DashboardPageProps = {
  onCreateReport: () => void;
  feedbackMessage?: string | null;
};

export function DashboardPage({
  onCreateReport,
  feedbackMessage,
}: DashboardPageProps) {
  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="A high-level view of delivery health and project momentum."
        actions={
          <button
            type="button"
            onClick={onCreateReport}
            className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-800"
          >
            Create Report
          </button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Projects"
          value="12"
          subtitle="Placeholder metric"
        />
        <StatCard
          title="Active Projects"
          value="7"
          subtitle="Placeholder metric"
        />
        <StatCard
          title="Completed Projects"
          value="5"
          subtitle="Placeholder metric"
        />
        <StatCard
          title="Total Tasks"
          value="84"
          subtitle="Placeholder metric"
        />
      </div>

      {feedbackMessage && (
        <div className="mb-6 rounded-xl border border-sky-500/30 bg-sky-500/10 px-4 py-3 text-sm text-sky-200">
          {feedbackMessage}
        </div>
      )}

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <Card
          title="Project Progress"
          description="Placeholder progress overview for future data integration."
        >
          <div className="space-y-6">
            <div>
              <div className="mb-3 flex items-center justify-between text-sm text-slate-300">
                <span>Website Redesign</span>
                <span>72%</span>
              </div>
              <ProgressBar value={72} />
            </div>
            <div>
              <div className="mb-3 flex items-center justify-between text-sm text-slate-300">
                <span>Mobile App Launch</span>
                <span>48%</span>
              </div>
              <ProgressBar value={48} />
            </div>
            <div>
              <div className="mb-3 flex items-center justify-between text-sm text-slate-300">
                <span>API Migration</span>
                <span>84%</span>
              </div>
              <ProgressBar value={84} />
            </div>
          </div>
        </Card>

        <Card
          title="Upcoming Deadlines"
          description="Static placeholder schedule."
        >
          <ul className="space-y-3 text-sm text-slate-300">
            <li className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
              Design QA review — 2 days
            </li>
            <li className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
              Sprint demo prep — 4 days
            </li>
            <li className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
              Client milestone — 6 days
            </li>
          </ul>
        </Card>
      </div>

      {/* Functionality Team: Replace placeholder statistics and progress values with live data from the API or context. */}
    </div>
  );
}
