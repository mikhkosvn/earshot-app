interface OverviewStatCardProps {
  label: string;
  value: string;
  change: number;
}

const changeText = (change: number) => {
  if (change > 0) return `+${change}%`;
  return `${change}%`;
};

export function OverviewStatCard({
  label,
  value,
  change,
}: OverviewStatCardProps) {
  return (
    <div className="flex flex-col gap-1 border-r border-b p-3 last:border-r-0 lg:border-b-0">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-xl font-semibold tabular-nums">{value}</p>
      <p className="text-xs text-muted-foreground">
        {changeText(change)} vs previous period
      </p>
    </div>
  );
}
