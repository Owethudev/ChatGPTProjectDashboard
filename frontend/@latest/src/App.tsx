import { useState } from "react";
import "./App.css";
import "./index.css";
import { Sidebar } from "./components/layout/Sidebar";
import { Navbar } from "./components/layout/Navbar";
import { DashboardPage } from "./pages/DashboardPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { ProjectDetailsPage } from "./pages/ProjectDetailsPage";
import { TaskDetailsPage } from "./pages/TaskDetailsPage";
import { CreateTaskPage } from "./pages/CreateTaskPage";
import { Breadcrumb } from "./components/common/Breadcrumb";
import { Card } from "./components/ui/Card";
import { EmptyState } from "./components/common/EmptyState";
import { Modal } from "./components/ui/Modal";
import { LoadingSkeleton } from "./components/common/LoadingSkeleton";
import { ErrorState } from "./components/common/ErrorState";
import type { View } from "./types";

export default function App() {
  const [activeView, setActiveView] = useState<View>("dashboard");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const renderView = () => {
    switch (activeView) {
      case "projects":
        return (
          <div className="space-y-6">
            <ProjectsPage onNewProject={() => setIsModalOpen(true)} />
            <ProjectDetailsPage />
          </div>
        );
      case "tasks":
        return (
          <div className="space-y-6">
            <CreateTaskPage
              onSubmit={() =>
                setFeedbackMessage("Task draft is ready for submission.")
              }
              onCancel={() =>
                setFeedbackMessage("Task creation was cancelled.")
              }
            />
            <TaskDetailsPage />
          </div>
        );
      case "reports":
        return (
          <Card
            title="Reports"
            description="A placeholder reports view for future charts and exports."
          >
            <p className="text-sm text-slate-400">
              Reports and exports will be wired up here later.
            </p>
          </Card>
        );
      default:
        return (
          <DashboardPage
            onCreateReport={() =>
              setFeedbackMessage("Report generation started.")
            }
            feedbackMessage={feedbackMessage}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex min-h-screen">
        <Sidebar activeView={activeView} onNavigate={setActiveView} />
        <div className="flex-1">
          <Navbar />
          <main className="px-4 py-6 sm:px-6 lg:px-8">
            <Breadcrumb
              items={[
                "Home",
                "Workspace",
                activeView.charAt(0).toUpperCase() + activeView.slice(1),
              ]}
            />
            {feedbackMessage && (
              <div className="mb-6 rounded-xl border border-sky-500/30 bg-sky-500/10 px-4 py-3 text-sm text-sky-200">
                {feedbackMessage}
              </div>
            )}
            {renderView()}

            <div className="mt-8 grid gap-6 xl:grid-cols-3">
              <Card
                title="Empty State"
                description="Placeholder for future empty data states."
              >
                <EmptyState
                  title="No projects yet"
                  description="This section will display an empty state when the data set is empty."
                />
              </Card>
              <Card
                title="Loading State"
                description="Placeholder for async content loading."
              >
                <LoadingSkeleton />
              </Card>
              <Card
                title="Error State"
                description="Placeholder for failed requests or validation issues."
              >
                <ErrorState />
              </Card>
            </div>

            {isModalOpen && (
              <div className="mt-8">
                <Modal
                  title="Create Project"
                  onClose={() => setIsModalOpen(false)}
                >
                  <p className="text-sm text-slate-400">
                    Project creation modal is now open and ready for future form
                    wiring.
                  </p>
                </Modal>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
