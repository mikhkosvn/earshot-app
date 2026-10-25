interface CronModeButtonLabelProps {
  isManual: boolean;
}

export function CronModeButtonLabel({ isManual }: CronModeButtonLabelProps) {
  if (isManual) return 'Switch to Builder';

  return 'Switch to Manual Input';
}
