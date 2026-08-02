export function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(date);
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function getProgressLabel(progress: number) {
  if (progress >= 100) return "Completed";
  if (progress >= 70) return "Near complete";
  if (progress >= 40) return "In progress";
  return "Just started";
}
