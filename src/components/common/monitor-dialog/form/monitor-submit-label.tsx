'use client';

import { useIsSavingMonitor } from '../_hooks/use-is-saving-monitor';

type MonitorSubmitLabelProps = {
  idle: string;
  pending: string;
};

export function MonitorSubmitLabel({ idle, pending }: MonitorSubmitLabelProps) {
  const isSaving = useIsSavingMonitor();

  if (isSaving) return pending;
  return idle;
}
