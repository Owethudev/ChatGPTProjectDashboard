type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function SearchBar({
  value,
  onChange,
  placeholder = "Search",
}: SearchBarProps) {
  return (
    <label className="block text-sm text-slate-600">
      <span className="mb-2 block">Search</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-full border border-white/80 bg-white/75 px-3 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400"
      />
    </label>
  );
}
