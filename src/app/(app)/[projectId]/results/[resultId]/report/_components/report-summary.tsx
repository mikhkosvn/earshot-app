'use client';

import { useResultDetail } from '../../_hooks/use-result-detail';
import { formatPercent } from '../../_utils/number-format';
import { runsPassedText } from '../../_utils/result-text';

export function ReportSummary() {
  const result = useResultDetail();
  const stats = [
    { label: 'Success rate', value: formatPercent(result.successRate) },
    { label: 'Total runs', value: result.counts.total },
    { label: 'Passed', value: result.counts.success },
    { label: 'Failed', value: result.counts.failed },
    { label: 'In progress', value: result.counts.inProgress },
  ];

  return (
    <section className="flex flex-col gap-3 rounded-lg border p-4">
      <h2 className="text-base font-semibold">
        {runsPassedText(result.counts)}
      </h2>
      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-0.5">
            <dt className="text-xs text-muted-foreground">{stat.label}</dt>
            <dd className="text-lg font-semibold tabular-nums">{stat.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
