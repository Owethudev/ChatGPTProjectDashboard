import type { Project } from "./project";
import type { Task } from "./task";
import type { TeamMember } from "./member";

export type View = "dashboard" | "projects" | "tasks" | "reports";

export * from "./project";
export * from "./task";
export * from "./member";

export type ActivityType = "project" | "task" | "member";

export interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  createdAt: string;
  projectId?: string;
  taskId?: string;
}

export interface DashboardStats {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  totalTasks: number;
  completedTasks: number;
  overdueTasks: number;
  upcomingDeadlines: number;
  averageProgress: number;
  overallProgress: number;
  completedPercentage: number;
  remainingPercentage: number;
  tasksDueThisWeek: number;
}

export interface DashboardSeedData {
  projects: Project[];
  tasks: Task[];
  members: TeamMember[];
  activities: Activity[];
}
