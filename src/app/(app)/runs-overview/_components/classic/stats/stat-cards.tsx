'use client';

import { useRunsOverviewQuery } from '../../../_hooks/use-runs-overview-query';
import { OverviewStatCard } from './overview-stat-card';

export function StatCards() {
  const { data: overview } = useRunsOverviewQuery();

  return (
    <div className="grid grid-cols-2 overflow-hidden rounded-lg border bg-card lg:grid-cols-4">
      <OverviewStatCard
        label="Success rate"
        value={`${overview.successRate.value.toFixed(1)}%`}
        change={overview.successRate.change}
      />
      <OverviewStatCard
        label="Number of calls"
        value={String(overview.totalCalls.value)}
        change={overview.totalCalls.change}
      />
      <OverviewStatCard
        label="Talk ratio"
        value={overview.avgTalkRatio.value.toFixed(2)}
        change={overview.avgTalkRatio.change}
      />
      <OverviewStatCard
        label="Average latency"
        value={`${overview.avgLatency.value.toFixed(2)}ms`}
        change={overview.avgLatency.change}
      />
    </div>
  );
}
