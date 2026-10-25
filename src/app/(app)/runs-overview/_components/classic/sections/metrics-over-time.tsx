'use client';

import { useRunsOverviewParams } from '../../../_hooks/use-runs-overview-params';
import { useRunsOverviewQuery } from '../../../_hooks/use-runs-overview-query';
import { OverviewChartEmpty } from '../trends/overview-chart-empty';
import { MetricChartCard } from './metric-chart-card';
import { OverviewSection } from './overview-section';

export function MetricsOverTime() {
  const { data: overview } = useRunsOverviewQuery();
  const [{ hidden }] = useRunsOverviewParams();
  const visible = overview.metricSummary.filter(
    (metric) => !hidden.includes(metric.metricId),
  );

  if (visible.length === 0) {
    return (
      <OverviewSection title="Metrics over time">
        <OverviewChartEmpty />
      </OverviewSection>
    );
  }

  return (
    <OverviewSection title="Metrics over time">
      <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-2 xl:grid-cols-3">
        {visible.map((metric) => (
          <MetricChartCard key={metric.metricId} metric={metric} />
        ))}
      </div>
    </OverviewSection>
  );
}
