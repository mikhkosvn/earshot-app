'use client';

import { useRunsOverviewParams } from '../../../_hooks/use-runs-overview-params';
import { useRunsOverviewQuery } from '../../../_hooks/use-runs-overview-query';
import { OverviewSection } from '../sections/overview-section';
import { OverviewChart } from './overview-chart';
import { SuccessRateCard } from './success-rate-card';

export function TrendsOverview() {
  const { data: overview } = useRunsOverviewQuery();
  const [{ chartType }] = useRunsOverviewParams();

  return (
    <OverviewSection title="Trends overview">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:divide-x">
        <SuccessRateCard />
        <div className="flex flex-col gap-2 p-3">
          <h3 className="text-sm font-medium">Latency over time</h3>
          <OverviewChart
            points={overview.latencySummary}
            chartType={chartType}
            percent={false}
            name="Latency (in ms)"
          />
        </div>
      </div>
    </OverviewSection>
  );
}
