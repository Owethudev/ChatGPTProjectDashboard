import { PageHeader } from "../components/common/PageHeader";
import { Card } from "../components/ui/Card";
import { ProgressBar } from "../components/ui/ProgressBar";
import { Badge } from "../components/ui/Badge";

export function ProjectDetailsPage() {
  return (
    <div>
      <PageHeader
        title="Project Details"
        description="Detailed project shell with placeholders for future data and interactions."
      />

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-6">
          <Card
            title="Project Information"
            description="Static overview placeholder."
          >
            <div className="space-y-3 text-sm text-slate-300">
              <p>
                <span className="text-slate-500">Project:</span> Northstar
                Rebrand
              </p>
              <p>
                <span className="text-slate-500">Summary:</span> Placeholder
                project details for future integration.
              </p>
              <p>
                <span className="text-slate-500">Client:</span> Horizon Labs
              </p>
            </div>
          </Card>

          <Card
            title="Progress"
            description="Progress and milestone placeholders."
          >
            <div className="space-y-4">
              <ProgressBar value={68} label="Delivery progress" />
              <ProgressBar value={41} label="Design review" />
            </div>
          </Card>

          <Card
            title="Tasks"
            description="A task list placeholder for the functionality team."
          >
            <div className="space-y-3 text-sm text-slate-300">
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                Wireframe review
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
                Stakeholder sign-off
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="Team Members" description="Placeholder roster.">
            <div className="space-y-3">
              {[
                { name: "Alicia Chen", role: "Product Lead" },
                { name: "Derek Moore", role: "Designer" },
                { name: "Nina Patel", role: "Engineer" },
              ].map((member) => (
                <div
                  key={member.name}
                  className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-3 text-sm text-slate-300"
                >
                  <div>
                    <p className="font-medium text-white">{member.name}</p>
                    <p className="text-slate-400">{member.role}</p>
                  </div>
                  <Badge label="Assigned" tone="info" />
                </div>
              ))}
            </div>
          </Card>

          <Card title="Deadlines" description="Static date placeholders.">
            <ul className="space-y-2 text-sm text-slate-300">
              <li>Kickoff: Aug 01</li>
              <li>Design review: Aug 15</li>
              <li>Launch: Sep 01</li>
            </ul>
          </Card>

          <Card title="Recent Activity" description="Placeholder timeline.">
            <div className="space-y-2 text-sm text-slate-300">
              <p>• Design updated</p>
              <p>• Comment added by stakeholder</p>
              <p>• Milestone marked complete</p>
            </div>
          </Card>
        </div>
      </div>

      {/* Functionality Team: Replace placeholder content with real project details, task lists, deadlines, and team members. */}
    </div>
  );
}
