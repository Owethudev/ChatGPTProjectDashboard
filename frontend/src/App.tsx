import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import "./index.css";
import { Sidebar } from "./components/layout/Sidebar";
import { Navbar } from "./components/layout/Navbar";
import { Breadcrumb } from "./components/common/Breadcrumb";
import { AppRoutes } from "./routes/AppRoutes";
import { ProjectProvider } from "./context/ProjectContext";
import type { View } from "./types";

function AppShell() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState<View>("dashboard");

  const breadcrumbItems = useMemo(() => {
    const path = location.pathname;

  if (path.startsWith("/projects/")) {
    return [
      { label: "Home", href: "/dashboard" },
      { label: "Workspace", href: "/projects" },
      { label: "Projects", href: "/projects" },
      { label: "Details" },
    ];
  }

  if (path.startsWith("/tasks/")) {
    return [
      { label: "Home", href: "/dashboard" },
      { label: "Workspace", href: "/projects" },
      { label: "Tasks", href: "/tasks/new" },
      { label: "Details" },
    ];
  }

  switch (activeView) {
    case "dashboard":
      return [
        { label: "Home", href: "/dashboard" },
        { label: "Workspace", href: "/projects" },
        { label: "Dashboard" },
      ];

    case "projects":
      return [
        { label: "Home", href: "/dashboard" },
        { label: "Workspace", href: "/projects" },
        { label: "Projects" },
      ];

    case "tasks":
      return [
        { label: "Home", href: "/dashboard" },
        { label: "Workspace", href: "/projects" },
        { label: "Tasks" },
      ];

    default:
      return [
        { label: "Home", href: "/dashboard" },
        { label: "Workspace", href: "/projects" },
      ];
  }
  }, [activeView, location.pathname]);

  const handleNavigate = (view: View) => {
    setActiveView(view);
    switch (view) {
      case "dashboard":
        navigate("/dashboard");
        break;
      case "projects":
        navigate("/projects");
        break;
      case "tasks":
        navigate("/tasks/new");
        break;
      case "reports":
        navigate("/dashboard");
        break;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex min-h-screen">
        <Sidebar activeView={activeView} onNavigate={handleNavigate} />
        <div className="flex-1">
          <Navbar />
          <main className="px-4 py-6 sm:px-6 lg:px-8">
            <Breadcrumb items={breadcrumbItems} />
            <AppRoutes />
          </main>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ProjectProvider>
      <AppShell />
    </ProjectProvider>
  );
}
