type ReevaluateMetricsEmptyProps = {
  count: number;
};

export function ReevaluateMetricsEmpty({ count }: ReevaluateMetricsEmptyProps) {
  if (count > 0) return null;
  return (
    <p className="px-2 py-6 text-center text-xs text-muted-foreground">
      No metrics found.
    </p>
  );
}
