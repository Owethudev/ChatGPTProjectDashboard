import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PageHeader } from "../components/common/PageHeader";
import { Card } from "../components/ui/Card";
import { ProgressBar } from "../components/ui/ProgressBar";
import { StatusBadge } from "../components/ui/StatusBadge";
import { PriorityBadge } from "../components/ui/PriorityBadge";
import { TaskCard } from "../components/tasks/TaskCard";
import { EmptyState } from "../components/common/EmptyState";
import { useProjects } from "../context/ProjectContext";
import { formatDate } from "../utils/helpers";

export function ProjectDetailsPage() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const {
    projects,
    tasks,
    members,
    updateTaskStatus,
    updateTaskPriority,
    deleteTask,
  } = useProjects();
  const project = useMemo(
    () => projects.find((item) => item.id === projectId),
    [projectId, projects],
  );
  const projectTasks = useMemo(
    () => tasks.filter((task) => task.projectId === projectId),
    [projectId, tasks],
  );
  const projectMembers = useMemo(
    () =>
      members.filter((member) => project?.teamMemberIds.includes(member.id)),
    [members, project],
  );

  if (!project) {
    return (
      <div>
        <PageHeader
          title="Project not found"
          description="The selected project could not be found."
        />
        <Card
          title="Missing project"
          description="The requested project is not available in the current workspace."
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

  return (
    <div>
      <PageHeader title={project.name} description={project.description} />
      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-6">
          <Card
            title="Project Information"
            description="Core project details and health metrics."
          >
            <div className="space-y-3 text-sm text-slate-300">
              <p>
                <span className="text-slate-500">Status:</span>{" "}
                <span className="ml-2 inline-flex">
                  <StatusBadge status={project.status} />
                </span>
              </p>
              <p>
                <span className="text-slate-500">Priority:</span>{" "}
                <span className="ml-2 inline-flex">
                  <PriorityBadge priority={project.priority} />
                </span>
              </p>
              <p>
                <span className="text-slate-500">Deadline:</span>{" "}
                {formatDate(project.deadline)}
              </p>
              <p>
                <span className="text-slate-500">Start date:</span>{" "}
                {formatDate(project.startDate)}
              </p>
            </div>
          </Card>

          <Card
            title="Progress"
            description="Current delivery progress and completion trend."
          >
            <div className="space-y-4">
              <ProgressBar value={project.progress} label="Delivery progress" />
            </div>
          </Card>

          <Card title="Tasks" description="The tasks attached to this project.">
            {projectTasks.length === 0 ? (
              <EmptyState
                title="No tasks yet"
                description="Add tasks from the create task view to start tracking work."
              />
            ) : (
              <div className="space-y-3">
                {projectTasks.map((task) => {
                  const member = members.find(
                    (entry) => entry.id === task.assignedMemberId,
                  );
                  return (
                    <TaskCard
                      key={task.id}
                      task={task}
                      member={member}
                      onSelect={(taskId) => navigate(`/tasks/${taskId}`)}
                      onStatusChange={(taskId, status) =>
                        updateTaskStatus(taskId, status)
                      }
                      onPriorityChange={(taskId, priority) =>
                        updateTaskPriority(taskId, priority)
                      }
                    />
                  );
                })}
              </div>
            )}
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="Team Members" description="Assigned contributors.">
            <div className="space-y-3">
              {projectMembers.length === 0 ? (
                <p className="text-sm text-slate-400">
                  No team members assigned yet.
                </p>
              ) : (
                projectMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 px-3 py-3 text-sm text-slate-300"
                  >
                    <div>
                      <p className="font-medium text-white">{member.name}</p>
                      <p className="text-slate-400">{member.role}</p>
                    </div>
                    <StatusBadge status="Active" />
                  </div>
                ))
              )}
            </div>
          </Card>

          <Card title="Timeline" description="Key project dates.">
            <ul className="space-y-2 text-sm text-slate-300">
              <li>Start: {formatDate(project.startDate)}</li>
              <li>Deadline: {formatDate(project.deadline)}</li>
            </ul>
          </Card>

          <Card
            title="Quick actions"
            description="Manage the current project state."
          >
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => navigate("/tasks/new")}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-200"
              >
                Create task
              </button>
              <button
                type="button"
                onClick={() => deleteTask(projectTasks[0]?.id ?? "")}
                className="w-full rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-2 text-sm text-rose-200"
              >
                Delete first task
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
