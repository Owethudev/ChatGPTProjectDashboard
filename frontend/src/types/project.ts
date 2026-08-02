export type ProjectStatus = "Planning" | "Active" | "On Track" | "At Risk" | "Completed" | "Archived";
export type ProjectPriority = "Low" | "Medium" | "High" | "Critical";

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  progress: number;
  deadline: string;
  startDate: string;
  teamMemberIds: string[];
  createdAt: string;
  updatedAt: string;
}
