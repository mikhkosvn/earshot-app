interface MonitorStatusLabelProps {
  isActive: boolean;
}

export function MonitorStatusLabel({ isActive }: MonitorStatusLabelProps) {
  if (isActive) {
    return (
      <span className="text-[10px] font-medium tracking-wide text-emerald-600 uppercase dark:text-emerald-400">
        Active
      </span>
    );
  }

  return (
    <span className="text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
      Paused
    </span>
  );
}
