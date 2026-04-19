type StatusBadgeProps = {
  released: boolean;
  label: string;
};

export function StatusBadge({ released, label }: StatusBadgeProps) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-lince-accent/50 bg-white/60 px-3 py-2.5">
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-lg ${
          released
            ? "border-lince-primary bg-lince-primary/15"
            : "border-neutral-800 bg-white"
        }`}
        aria-hidden
      >
        {released ? "✅" : "❌"}
      </span>
      <span className="text-sm font-semibold text-foreground">{label}</span>
    </div>
  );
}
