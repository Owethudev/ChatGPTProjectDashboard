import { useMemo } from "react";
import type { DashboardStats, Project, Task } from "../types";

export function useProjectStats(projects: Project[], tasks: Task[]) {
  return useMemo<DashboardStats>(() => {
    const totalProjects = projects.length;
    const activeProjects = projects.filter((project) => project.status === "Active" || project.status === "On Track" || project.status === "Planning" || project.status === "At Risk").length;
    const completedProjects = projects.filter((project) => project.status === "Completed").length;
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.status === "Completed").length;

    const today = new Date();
    const upcomingDeadlines = projects.filter((project) => {
      const deadline = new Date(project.deadline);
      const diffDays = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return diffDays >= 0 && diffDays <= 7;
    }).length;

    const overdueTasks = tasks.filter((task) => {
      const dueDate = new Date(task.dueDate);
      return task.status !== "Completed" && dueDate < today;
    }).length;

    const tasksDueThisWeek = tasks.filter((task) => {
      const dueDate = new Date(task.dueDate);
      const diffDays = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return diffDays >= 0 && diffDays <= 7;
    }).length;

    const averageProgress = projects.length > 0 ? Math.round(projects.reduce((sum, project) => sum + project.progress, 0) / projects.length) : 0;
    const overallProgress = totalProjects > 0 ? Math.round(projects.reduce((sum, project) => sum + project.progress, 0) / totalProjects) : 0;
    const completedPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    const remainingPercentage = 100 - completedPercentage;

    return {
      totalProjects,
      activeProjects,
      completedProjects,
      totalTasks,
      completedTasks,
      overdueTasks,
      upcomingDeadlines,
      averageProgress,
      overallProgress,
      completedPercentage,
      remainingPercentage,
      tasksDueThisWeek,
    };
  }, [projects, tasks]);
}
