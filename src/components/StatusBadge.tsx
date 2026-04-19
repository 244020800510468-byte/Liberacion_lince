type StatusBadgeProps = {
  released: boolean;
  label: string;
};

export function StatusBadge({ released, label }: StatusBadgeProps) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-neutral-600 bg-[#2d2d2d] px-3 py-2.5">
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-lg ${
          released
            ? "border-[#5FAF2E] bg-[#5FAF2E]/20"
            : "border-neutral-500 bg-[#1e1e1e]"
        }`}
        aria-hidden
      >
        {released ? "✅" : "❌"}
      </span>
      <span className="text-sm font-semibold text-neutral-100">{label}</span>
    </div>
  );
}
