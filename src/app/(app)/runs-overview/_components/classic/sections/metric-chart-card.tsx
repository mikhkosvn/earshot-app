'use client';

import type { MetricOverTime } from '@/server/runs-overview/types';

import { useRunsOverviewParams } from '../../../_hooks/use-runs-overview-params';
import { OverviewChart } from '../trends/overview-chart';

type MetricChartCardProps = {
  metric: MetricOverTime;
};

export function MetricChartCard({ metric }: MetricChartCardProps) {
  const [{ chartType }] = useRunsOverviewParams();

  return (
    <article aria-label={metric.name} className="flex flex-col gap-2 bg-card p-3">
      <h3 className="truncate text-sm font-medium">{metric.name}</h3>
      <OverviewChart
        points={metric.points}
        chartType={chartType}
        percent={metric.percent}
        name={metric.name}
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span className="truncate">{metric.name}</span>
        <span>{metric.aggregationLabel}</span>
      </div>
    </article>
  );
}
