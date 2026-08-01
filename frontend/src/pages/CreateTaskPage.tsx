import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../components/common/PageHeader";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { useProjects } from "../context/ProjectContext";
import type { TaskPriority, TaskStatus } from "../types";

type FormState = {
  title: string;
  description: string;
  projectId: string;
  priority: TaskPriority;
  status: TaskStatus;
  assignedMemberId: string;
  dueDate: string;
};

const initialState: FormState = {
  title: "",
  description: "",
  projectId: "",
  priority: "Medium",
  status: "To Do",
  assignedMemberId: "",
  dueDate: "",
};

export function CreateTaskPage() {
  const navigate = useNavigate();
  const { projects, members, addTask } = useProjects();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const [formState, setFormState] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  const selectedProject = useMemo(
    () =>
      projects.find((project) => project.id === formState.projectId) ??
      projects[0],
    [formState.projectId, projects],
  );

  const validate = (state: FormState) => {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    if (!state.title.trim()) nextErrors.title = "Title is required.";
    if (!state.description.trim())
      nextErrors.description = "Description is required.";
    if (!state.projectId) nextErrors.projectId = "Select a project.";
    if (!state.priority) nextErrors.priority = "Priority is required.";
    if (!state.dueDate) nextErrors.dueDate = "Due date is required.";
    if (!state.assignedMemberId)
      nextErrors.assignedMemberId = "Assign a team member.";
    return nextErrors;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(formState);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    addTask({
      projectId: formState.projectId,
      title: formState.title.trim(),
      description: formState.description.trim(),
      status: formState.status,
      priority: formState.priority,
      assignedMemberId: formState.assignedMemberId || null,
      dueDate: formState.dueDate,
      tags: selectedProject ? [selectedProject.name.toLowerCase()] : [],
      notes: "Created from the task form",
    });

    setSubmitted(true);
    setFormState(initialState);
    setErrors({});
    navigate(`/projects/${formState.projectId}`);
  };

  return (
    <div>
      <PageHeader
        title="Create Task"
        description="Create a task with validation and instant updates."
      />
      <Card
        title="Task Details"
        description="Controlled form with validation and persistence."
      >
        <form className="space-y-5" onSubmit={handleSubmit}>
          <label className="block text-sm text-slate-300">
            <span className="mb-2 block">Task title</span>
            <input
              ref={titleRef}
              value={formState.title}
              onChange={(event) =>
                setFormState((current) => ({
                  ...current,
                  title: event.target.value,
                }))
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2.5 text-sm text-white outline-none"
              placeholder="Enter a task title"
            />
            {errors.title && (
              <p className="mt-2 text-sm text-rose-300">{errors.title}</p>
            )}
          </label>
          <label className="block text-sm text-slate-300">
            <span className="mb-2 block">Description</span>
            <textarea
              value={formState.description}
              onChange={(event) =>
                setFormState((current) => ({
                  ...current,
                  description: event.target.value,
                }))
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2.5 text-sm text-white outline-none"
              rows={4}
              placeholder="Describe the task"
            />
            {errors.description && (
              <p className="mt-2 text-sm text-rose-300">{errors.description}</p>
            )}
          </label>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-sm text-slate-300">
              <span className="mb-2 block">Priority</span>
              <select
                value={formState.priority}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    priority: event.target.value as TaskPriority,
                  }))
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2.5 text-sm text-white outline-none"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
              {errors.priority && (
                <p className="mt-2 text-sm text-rose-300">{errors.priority}</p>
              )}
            </label>
            <label className="block text-sm text-slate-300">
              <span className="mb-2 block">Status</span>
              <select
                value={formState.status}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    status: event.target.value as TaskStatus,
                  }))
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2.5 text-sm text-white outline-none"
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="In Review">In Review</option>
                <option value="Completed">Completed</option>
              </select>
            </label>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-sm text-slate-300">
              <span className="mb-2 block">Project</span>
              <select
                value={formState.projectId}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    projectId: event.target.value,
                  }))
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2.5 text-sm text-white outline-none"
              >
                <option value="">Select project</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
              {errors.projectId && (
                <p className="mt-2 text-sm text-rose-300">{errors.projectId}</p>
              )}
            </label>
            <label className="block text-sm text-slate-300">
              <span className="mb-2 block">Assigned member</span>
              <select
                value={formState.assignedMemberId}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    assignedMemberId: event.target.value,
                  }))
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2.5 text-sm text-white outline-none"
              >
                <option value="">Select assignee</option>
                {members.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name}
                  </option>
                ))}
              </select>
              {errors.assignedMemberId && (
                <p className="mt-2 text-sm text-rose-300">
                  {errors.assignedMemberId}
                </p>
              )}
            </label>
          </div>
          <label className="block text-sm text-slate-300">
            <span className="mb-2 block">Due date</span>
            <input
              type="date"
              value={formState.dueDate}
              onChange={(event) =>
                setFormState((current) => ({
                  ...current,
                  dueDate: event.target.value,
                }))
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2.5 text-sm text-white outline-none"
            />
            {errors.dueDate && (
              <p className="mt-2 text-sm text-rose-300">{errors.dueDate}</p>
            )}
          </label>
          {submitted && (
            <p className="text-sm text-emerald-300">
              Task created successfully.
            </p>
          )}
          <div className="flex gap-3">
            <Button type="submit">Create Task</Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/projects")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
