import { Link } from "react-router-dom";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";

export function NotFoundPage() {
  return (
    <Card
      title="Page not found"
      description="The route you tried to reach does not exist."
    >
      <div className="space-y-4">
        <p className="text-sm text-slate-400">
          Try returning to the dashboard or browsing the project list.
        </p>
        <Link to="/dashboard">
          <Button type="button">Back to dashboard</Button>
        </Link>
      </div>
    </Card>
  );
}
