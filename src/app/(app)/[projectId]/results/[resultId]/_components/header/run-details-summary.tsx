'use client';

import { RunStatusLabel } from '@/server/results/constants/run-status-labels';
import { ResultRunTypeLabel } from '@/server/results/constants/result-list';

import { useResultDetail } from '../../_hooks/use-result-detail';

export function RunDetailsSummary() {
  const result = useResultDetail();
  const rows = [
    { label: 'Run type', value: ResultRunTypeLabel[result.runType] },
    { label: 'Status', value: RunStatusLabel[result.status] },
    { label: 'Total runs', value: result.counts.total },
    { label: 'Completed', value: result.counts.completed },
    { label: 'Passed', value: result.counts.success },
    { label: 'Failed', value: result.counts.failed },
    { label: 'In progress', value: result.counts.inProgress },
  ];

  return (
    <dl className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1">
      {rows.map((row) => (
        <div key={row.label} className="contents">
          <dt className="text-muted-foreground">{row.label}</dt>
          <dd className="text-right font-medium">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
