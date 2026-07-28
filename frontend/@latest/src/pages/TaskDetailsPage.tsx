import { PageHeader } from "../components/common/PageHeader";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";

export function TaskDetailsPage() {
  return (
    <div>
      <PageHeader
        title="Task Details"
        description="Static task overview for future editing and interaction work."
      />

      <Card title="Task Overview" description="Placeholder task details.">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4 text-sm text-slate-300">
            <div>
              <p className="text-slate-500">Task</p>
              <p className="mt-1 font-semibold text-white">
                Finalize wireframes
              </p>
            </div>
            <div>
              <p className="text-slate-500">Description</p>
              <p className="mt-1">
                Placeholder task description that will later be connected to
                real task content.
              </p>
            </div>
          </div>
          <div className="space-y-4 text-sm text-slate-300">
            <div className="flex flex-wrap gap-2">
              <Badge label="High Priority" tone="danger" />
              <Badge label="In Progress" tone="info" />
            </div>
            <div>
              <p className="text-slate-500">Assigned Member</p>
              <p className="mt-1 font-semibold text-white">Nina Patel</p>
            </div>
            <div>
              <p className="text-slate-500">Due Date</p>
              <p className="mt-1 font-semibold text-white">August 30, 2026</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Functionality Team: Add editing and task update interactions here. */}
    </div>
  );
}
