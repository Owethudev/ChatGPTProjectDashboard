type TextareaProps = {
  label?: string;
  placeholder?: string;
  className?: string;
};

export function Textarea({
  label,
  placeholder,
  className = "",
}: TextareaProps) {
  return (
    <label className="block text-sm text-slate-300">
      {label && <span className="mb-2 block">{label}</span>}
      <textarea
        placeholder={placeholder}
        rows={4}
        className={`w-full rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 ${className}`}
      />
    </label>
  );
}
