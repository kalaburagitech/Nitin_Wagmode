"use client";

// Row of toggle buttons for filtering a list. `options` is
// [{ id, label, count? }]; the selected option has aria-pressed="true".
export default function FilterBar({ label, options, value, onChange }) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((option) => {
        const selected = option.id === value;
        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(option.id)}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors ${
              selected
                ? "border-accent bg-accent text-on-accent"
                : "hairline text-body hover:border-accent hover:text-ink"
            }`}
          >
            {option.label}
            {typeof option.count === "number" && (
              <span className={`font-mono text-[11px] ${selected ? "opacity-80" : "text-muted"}`}>{option.count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
