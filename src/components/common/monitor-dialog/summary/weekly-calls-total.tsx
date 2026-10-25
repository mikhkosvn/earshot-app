type WeeklyCallsTotalProps = {
  callsPerWeek: number;
  unit: string;
};

export function WeeklyCallsTotal({
  callsPerWeek,
  unit,
}: WeeklyCallsTotalProps) {
  return (
    <div className="flex flex-col gap-0.5">
      <p className="text-sm text-muted-foreground">
        <span className="text-xl font-semibold text-foreground tabular-nums">
          {callsPerWeek}
        </span>{' '}
        {unit} / week
      </p>
      <p className="text-xs text-muted-foreground">
        while this monitor is active
      </p>
    </div>
  );
}
