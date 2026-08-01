type ErrorStateProps = {
  title?: string;
  description?: string;
};

export function ErrorState({
  title = "Something went wrong",
  description = "A placeholder error state for future integration.",
}: ErrorStateProps) {
  return (
    <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-6 text-sm text-rose-200">
      <h3 className="font-semibold text-white">{title}</h3>
      <p className="mt-2">{description}</p>
    </div>
  );
}
