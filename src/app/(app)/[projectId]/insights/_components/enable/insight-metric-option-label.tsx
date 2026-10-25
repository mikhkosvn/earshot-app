interface InsightMetricOptionLabelProps {
  id: number;
  name: string;
}

export function InsightMetricOptionLabel({
  id,
  name,
}: InsightMetricOptionLabelProps) {
  return (
    <span className="flex items-center gap-2">
      <span className="rounded-sm border bg-muted px-1 font-mono text-[10px] text-muted-foreground">
        {id}
      </span>
      <span>{name}</span>
    </span>
  );
}
