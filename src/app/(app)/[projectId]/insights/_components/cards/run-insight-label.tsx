interface RunInsightLabelProps {
  isRunning: boolean;
}

export function RunInsightLabel({ isRunning }: RunInsightLabelProps) {
  if (isRunning) return 'Running...';
  return 'Run now';
}
