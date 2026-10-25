interface MoreMetricsToggleLabelProps {
  open: boolean;
  count: number;
}

export function MoreMetricsToggleLabel({
  open,
  count,
}: MoreMetricsToggleLabelProps) {
  if (open) return 'Show fewer';
  return `Show ${count} more metrics`;
}
