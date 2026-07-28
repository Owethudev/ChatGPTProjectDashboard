import { PageHeader } from "../components/common/PageHeader";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select";
import { Textarea } from "../components/ui/Textarea";

type CreateTaskPageProps = {
  onSubmit?: () => void;
  onCancel?: () => void;
};

export function CreateTaskPage({ onSubmit, onCancel }: CreateTaskPageProps) {
  return (
    <div>
      <PageHeader
        title="Create Task"
        description="Static form shell for future validation and submission logic."
      />

      <Card title="Task Details" description="Visual-only task form skeleton.">
        <form
          className="space-y-5"
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit?.();
          }}
        >
          <Input label="Task Name" placeholder="Enter task name" />
          <Textarea label="Description" placeholder="Add a short description" />
          <div className="grid gap-4 md:grid-cols-2">
            <Select label="Priority" placeholder="Select priority" />
            <Select label="Status" placeholder="Select status" />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Select label="Team Member" placeholder="Select assignee" />
            <label className="block text-sm text-slate-300">
              <span className="mb-2 block">Due Date</span>
              <input
                type="date"
                className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2.5 text-sm text-white outline-none"
              />
            </label>
          </div>
          <div className="flex gap-3">
            <Button type="submit">Create Task</Button>
            <Button type="button" variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </Card>

      {/* Functionality Team: Add form validation, submission handling, and dropdown options. */}
    </div>
  );
}
