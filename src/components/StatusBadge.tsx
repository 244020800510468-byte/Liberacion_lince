type StatusBadgeProps = {
  released: boolean;
  label: string;
};

export function StatusBadge({ released, label }: StatusBadgeProps) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-stone-400 bg-[#dfd6c8] px-3 py-2.5">
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-lg ${
          released
            ? "border-[#22c55e] bg-[#22c55e]/20"
            : "border-stone-400 bg-[#ebe4d8]"
        }`}
        aria-hidden
      >
        {released ? "✅" : "❌"}
      </span>
      <span className="text-sm font-semibold text-stone-900">{label}</span>
    </div>
  );
}
