import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  title?: string;
  description?: string;
  className?: string;
};

export function Card({
  children,
  title,
  description,
  className = "",
}: CardProps) {
  return (
    <section
      className={`rounded-2xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg shadow-slate-950/20 ${className}`}
    >
      {(title || description) && (
        <div className="mb-4">
          {title && (
            <h3 className="text-lg font-semibold text-white">{title}</h3>
          )}
          {description && (
            <p className="mt-1 text-sm text-slate-400">{description}</p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
