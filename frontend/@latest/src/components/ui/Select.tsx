type SelectProps = {
  label?: string;
  placeholder?: string;
  className?: string;
};

export function Select({ label, placeholder, className = "" }: SelectProps) {
  return (
    <label className="block text-sm text-slate-300">
      {label && <span className="mb-2 block">{label}</span>}
      <select
        className={`w-full rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2.5 text-sm text-white outline-none ${className}`}
      >
        <option value="">{placeholder}</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </label>
  );
}
