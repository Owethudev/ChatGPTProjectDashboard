import { createContext, useContext, useMemo, useState } from "react";
import { mockData } from "../data/mockData";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type {
  Activity,
  ActivityType,
  DashboardSeedData,
  Project,
  Task,
  TeamMember,
} from "../types";

interface ProjectContextValue {
  projects: Project[];
  tasks: Task[];
  members: TeamMember[];
  activities: Activity[];
  loading: boolean;
  error: string | null;
  addTask: (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
  addProject: (
    project: Omit<Project, "id" | "createdAt" | "updatedAt">,
  ) => void;
  updateProject: (projectId: string, updates: Partial<Project>) => void;
  deleteProject: (projectId: string) => void;
  addMember: (member: Omit<TeamMember, "id">) => void;
  updateTaskStatus: (taskId: string, status: Task["status"]) => void;
  updateTaskPriority: (taskId: string, priority: Task["priority"]) => void;
  assignTaskToMember: (taskId: string, memberId: string | null) => void;
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  setMembers: React.Dispatch<React.SetStateAction<TeamMember[]>>;
  setActivities: React.Dispatch<React.SetStateAction<Activity[]>>;
}

const ProjectContext = createContext<ProjectContextValue | undefined>(
  undefined,
);

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [storedData, setStoredData] = useLocalStorage<DashboardSeedData>(
    "project-dashboard-data",
    mockData,
  );
  const [projects, setProjects] = useState<Project[]>(storedData.projects);
  const [tasks, setTasks] = useState<Task[]>(storedData.tasks);
  const [members, setMembers] = useState<TeamMember[]>(storedData.members);
  const [activities, setActivities] = useState<Activity[]>(
    storedData.activities,
  );
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);

  const syncStorage = (next: DashboardSeedData) => {
    setStoredData(next);
  };

  const addTask = (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const nextTasks = [newTask, ...tasks];
    const nextActivity: Activity = {
      id: crypto.randomUUID(),
      type: "task" as ActivityType,
      title: "Task created",
      description: `${newTask.title} was added to the tracker.`,
      createdAt: new Date().toISOString(),
      taskId: newTask.id,
      projectId: newTask.projectId,
    };
    const nextActivities = [nextActivity, ...activities];
    setTasks(nextTasks);
    setActivities(nextActivities);
    syncStorage({
      projects,
      tasks: nextTasks,
      members,
      activities: nextActivities,
    });
  };

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    const nextTasks = tasks.map((task) =>
      task.id === taskId
        ? { ...task, ...updates, updatedAt: new Date().toISOString() }
        : task,
    );
    setTasks(nextTasks);
    syncStorage({ projects, tasks: nextTasks, members, activities });
  };

  const deleteTask = (taskId: string) => {
    const nextTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(nextTasks);
    syncStorage({ projects, tasks: nextTasks, members, activities });
  };

  const addProject = (
    project: Omit<Project, "id" | "createdAt" | "updatedAt">,
  ) => {
    const nextProject: Project = {
      ...project,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const nextProjects = [nextProject, ...projects];
    const nextActivity: Activity = {
      id: crypto.randomUUID(),
      type: "project" as ActivityType,
      title: "Project created",
      description: `${nextProject.name} was added to the portfolio.`,
      createdAt: new Date().toISOString(),
      projectId: nextProject.id,
    };
    const nextActivities = [nextActivity, ...activities];
    setProjects(nextProjects);
    setActivities(nextActivities);
    syncStorage({
      projects: nextProjects,
      tasks,
      members,
      activities: nextActivities,
    });
  };

  const updateProject = (projectId: string, updates: Partial<Project>) => {
    const nextProjects = projects.map((project) =>
      project.id === projectId
        ? { ...project, ...updates, updatedAt: new Date().toISOString() }
        : project,
    );
    setProjects(nextProjects);
    syncStorage({ projects: nextProjects, tasks, members, activities });
  };

  const deleteProject = (projectId: string) => {
    const nextProjects = projects.filter((project) => project.id !== projectId);
    setProjects(nextProjects);
    syncStorage({ projects: nextProjects, tasks, members, activities });
  };

  const addMember = (member: Omit<TeamMember, "id">) => {
    const nextMember: TeamMember = { ...member, id: crypto.randomUUID() };
    const nextMembers = [nextMember, ...members];
    const nextActivity: Activity = {
      id: crypto.randomUUID(),
      type: "member" as ActivityType,
      title: "Member added",
      description: `${nextMember.name} joined the team.`,
      createdAt: new Date().toISOString(),
      projectId: projects[0]?.id,
    };
    const nextActivities = [nextActivity, ...activities];
    setMembers(nextMembers);
    setActivities(nextActivities);
    syncStorage({
      projects,
      tasks,
      members: nextMembers,
      activities: nextActivities,
    });
  };

  const updateTaskStatus = (taskId: string, status: Task["status"]) =>
    updateTask(taskId, { status });
  const updateTaskPriority = (taskId: string, priority: Task["priority"]) =>
    updateTask(taskId, { priority });
  const assignTaskToMember = (taskId: string, memberId: string | null) =>
    updateTask(taskId, { assignedMemberId: memberId });

  const value = useMemo<ProjectContextValue>(
    () => ({
      projects,
      tasks,
      members,
      activities,
      loading,
      error,
      addTask,
      updateTask,
      deleteTask,
      addProject,
      updateProject,
      deleteProject,
      addMember,
      updateTaskStatus,
      updateTaskPriority,
      assignTaskToMember,
      setProjects,
      setTasks,
      setMembers,
      setActivities,
    }),
    [projects, tasks, members, activities, loading, error],
  );

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProjects must be used within ProjectProvider");
  }
  return context;
}
