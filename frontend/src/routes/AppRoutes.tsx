import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import { DashboardPage } from "../pages/DashboardPage";
import { ProjectsPage } from "../pages/ProjectsPage";
import { TasksPage } from "../pages/TasksPage";
import { NotFoundPage } from "../pages/NotFoundPage";

const ProjectDetailsPage = lazy(() =>
  import("../pages/ProjectDetailsPage").then((module) => ({
    default: module.ProjectDetailsPage,
  })),
);
const TaskDetailsPage = lazy(() =>
  import("../pages/TaskDetailsPage").then((module) => ({
    default: module.TaskDetailsPage,
  })),
);
const CreateTaskPage = lazy(() =>
  import("../pages/CreateTaskPage").then((module) => ({
    default: module.CreateTaskPage,
  })),
);

function RouteFallback() {
  return <LoadingSpinner label="Loading page" />;
}

export function AppRoutes() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:projectId" element={<ProjectDetailsPage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/tasks/:taskId" element={<TaskDetailsPage />} />
        <Route path="/tasks/new" element={<CreateTaskPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
