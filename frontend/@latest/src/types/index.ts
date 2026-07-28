export type View = "dashboard" | "projects" | "tasks" | "reports";

export interface Project {
  name: string;
  status: "On Track" | "At Risk" | "Planning" | "Completed";
  owner: string;
  description: string;
  deadline: string;
}

export interface Task {
  title: string;
  priority: "High" | "Medium" | "Low";
  status: "In Progress" | "Blocked" | "Review" | "Done";
  assignee: string;
  dueDate: string;
  description: string;
}

export interface TeamMember {
  name: string;
  role: string;
  initials: string;
}
