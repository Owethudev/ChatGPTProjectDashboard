export type TaskStatus = "To Do" | "In Progress" | "In Review" | "Completed";
export type TaskPriority = "Low" | "Medium" | "High" | "Critical";

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignedMemberId: string | null;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  notes: string;
}
