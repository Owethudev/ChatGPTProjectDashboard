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
      className={`glass-card glow-ring rounded-[28px] border border-white/70 p-5 ${className}`}
    >
      {(title || description) && (
        <div className="mb-4">
          {title && (
            <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          )}
          {description && (
            <p className="mt-1 text-sm text-slate-600">{description}</p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
