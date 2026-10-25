interface RunDeepResearchLabelProps {
  isRunning: boolean;
}

export function RunDeepResearchLabel({ isRunning }: RunDeepResearchLabelProps) {
  if (isRunning) return 'Running...';
  return 'Run Deep Research';
}
