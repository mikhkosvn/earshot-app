export function WaveformLegend() {
  return (
    <div className="flex items-center gap-5 border-b px-4 py-2 text-xs text-muted-foreground">
      <span className="flex items-center gap-1.5">
        <span className="size-2 rounded-full bg-emerald-500" />
        Main agent
      </span>
      <span className="flex items-center gap-1.5">
        <span className="size-2 rounded-full bg-rose-400" />
        Testing agent
      </span>
    </div>
  );
}
