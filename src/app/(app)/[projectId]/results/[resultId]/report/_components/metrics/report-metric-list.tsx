'use client';

import { useSelectedReportMetrics } from '../../_hooks/use-selected-report-metrics';
import { ReportMetricSection } from './report-metric-section';

export function ReportMetricList() {
  const metrics = useSelectedReportMetrics();

  if (metrics.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">No metrics are selected.</p>
    );
  }
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-base font-semibold">Selected metrics</h2>
      {metrics.map((metric) => (
        <ReportMetricSection key={metric.metricId} metric={metric} />
      ))}
    </section>
  );
}
