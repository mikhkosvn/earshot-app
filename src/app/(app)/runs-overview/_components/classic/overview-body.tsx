'use client';

import { MetricsOverTime } from './sections/metrics-over-time';
import { TopFailedScenarios } from './sections/top-failed-scenarios';
import { StatCards } from './stats/stat-cards';
import { TrendsOverview } from './trends/trends-overview';

export function OverviewBody() {
  return (
    <div className="flex flex-col gap-3">
      <StatCards />
      <TrendsOverview />
      <MetricsOverTime />
      <TopFailedScenarios />
    </div>
  );
}
