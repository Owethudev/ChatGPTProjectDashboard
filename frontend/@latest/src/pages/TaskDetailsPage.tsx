import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PageHeader } from "../components/common/PageHeader";
import { Card } from "../components/ui/Card";
import { PriorityBadge } from "../components/ui/PriorityBadge";
import { StatusBadge } from "../components/ui/StatusBadge";
import { useProjects } from "../context/ProjectContext";
import type { Task } from "../types";
import { formatDate } from "../utils/helpers";

export function TaskDetailsPage() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const {
    tasks,
    members,
    updateTaskStatus,
    updateTaskPriority,
    assignTaskToMember,
    deleteTask,
  } = useProjects();
  const task = useMemo(
    () => tasks.find((item) => item.id === taskId),
    [taskId, tasks],
  );

  if (!task) {
    return (
      <div>
        <PageHeader
          title="Task not found"
          description="The selected task could not be found."
        />
        <Card
          title="Missing task"
          description="The task you requested is no longer available."
        >
          <button
            type="button"
            onClick={() => navigate("/projects")}
            className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-200"
          >
            Back to projects
          </button>
        </Card>
      </div>
    );
  }

  const assignedMember = members.find(
    (member) => member.id === task.assignedMemberId,
  );

  return (
    <div>
      <PageHeader
        title="Task Details"
        description="Inspect and update the current task state."
      />
      <Card
        title="Task Overview"
        description="Manage status, priority, assignee, and notes."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4 text-sm text-slate-300">
            <div>
              <p className="text-slate-500">Task</p>
              <p className="mt-1 font-semibold text-white">{task.title}</p>
            </div>
            <div>
              <p className="text-slate-500">Description</p>
              <p className="mt-1">{task.description}</p>
            </div>
            <div>
              <p className="text-slate-500">Notes</p>
              <p className="mt-1">{task.notes || "No notes yet."}</p>
            </div>
          </div>
          <div className="space-y-4 text-sm text-slate-300">
            <div className="flex flex-wrap gap-2">
              <PriorityBadge priority={task.priority} />
              <StatusBadge status={task.status} />
            </div>
            <div>
              <p className="text-slate-500">Assigned member</p>
              <p className="mt-1 font-semibold text-white">
                {assignedMember?.name ?? "Unassigned"}
              </p>
            </div>
            <div>
              <p className="text-slate-500">Due date</p>
              <p className="mt-1 font-semibold text-white">
                {formatDate(task.dueDate)}
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <label className="text-sm text-slate-300">
                <span className="mb-2 block">Status</span>
                <select
                  value={task.status}
                  onChange={(event) =>
                    updateTaskStatus(
                      task.id,
                      event.target.value as Task["status"],
                    )
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2.5 text-sm text-white outline-none"
                >
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="In Review">In Review</option>
                  <option value="Completed">Completed</option>
                </select>
              </label>
              <label className="text-sm text-slate-300">
                <span className="mb-2 block">Priority</span>
                <select
                  value={task.priority}
                  onChange={(event) =>
                    updateTaskPriority(
                      task.id,
                      event.target.value as Task["priority"],
                    )
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2.5 text-sm text-white outline-none"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </label>
            </div>
            <label className="text-sm text-slate-300">
              <span className="mb-2 block">Assign member</span>
              <select
                value={task.assignedMemberId ?? ""}
                onChange={(event) =>
                  assignTaskToMember(task.id, event.target.value || null)
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2.5 text-sm text-white outline-none"
              >
                <option value="">Unassigned</option>
                {members.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="button"
              onClick={() => deleteTask(task.id)}
              className="rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-2 text-sm text-rose-200"
            >
              Delete task
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
