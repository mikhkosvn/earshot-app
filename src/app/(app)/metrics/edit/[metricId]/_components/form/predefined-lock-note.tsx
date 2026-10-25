'use client';

import { LockIcon } from 'lucide-react';

import { useMetricDetail } from '../../_hooks/use-metric-detail';

export function PredefinedLockNote() {
  const metric = useMetricDetail();

  if (metric.editable) return null;

  return (
    <p className="flex items-center gap-2 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-100">
      <LockIcon className="size-4 shrink-0" />
      This predefined metric cannot be edited.
    </p>
  );
}
