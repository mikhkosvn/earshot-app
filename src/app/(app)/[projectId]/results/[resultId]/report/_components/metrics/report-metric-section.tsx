import type { ResultReportMetric } from '@/server/results/types';

import { ReportMetricExplanation } from './report-metric-explanation';

type ReportMetricSectionProps = {
  metric: ResultReportMetric;
};

export function ReportMetricSection({ metric }: ReportMetricSectionProps) {
  return (
    <div className="flex break-inside-avoid flex-col gap-2 rounded-lg border p-4">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-medium">{metric.name}</h3>
        <span className="text-sm text-muted-foreground tabular-nums">
          Score: {metric.score.toFixed(2)}
        </span>
      </div>
      <ReportMetricExplanation lines={metric.explanation} />
    </div>
  );
}
