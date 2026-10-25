'use client';

import { FlaskConicalIcon } from 'lucide-react';

import { EmptyState } from '@/components/common/empty-state';

import { useLabMetrics } from '../_hooks/use-lab-metrics';

export function LabMetricsEmpty() {
  const metrics = useLabMetrics();

  if (metrics.length > 0) return null;

  return (
    <EmptyState
      icon={FlaskConicalIcon}
      title="No metrics yet"
      description="Create a metric on the Metrics page. Then correct its score on a run or a call to add rows to its Lab."
      className="rounded-md border"
    />
  );
}
