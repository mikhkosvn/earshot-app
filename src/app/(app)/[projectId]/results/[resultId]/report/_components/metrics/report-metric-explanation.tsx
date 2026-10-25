interface ReportMetricExplanationProps {
  lines: readonly string[];
}

export function ReportMetricExplanation({
  lines,
}: ReportMetricExplanationProps) {
  if (lines.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No analysis is available for this metric.
      </p>
    );
  }
  return (
    <ul className="flex list-disc flex-col gap-1 pl-5 text-sm">
      {lines.map((line) => (
        <li key={line}>{line}</li>
      ))}
    </ul>
  );
}
