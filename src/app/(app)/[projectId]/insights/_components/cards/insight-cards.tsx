'use client';

import { useInsightsOverviewQuery } from '../../_hooks/queries/use-insights-overview-query';
import { FailureTrendsSection } from '../trends/failure-trends-section';
import { InsightCard } from './insight-card';
import { InsightsEmptyState } from './insights-empty-state';

export function InsightCards() {
  const { data: overview } = useInsightsOverviewQuery();

  if (overview.cards.length === 0) return <InsightsEmptyState />;
  return (
    <div className="flex flex-col gap-3">
      <div className="grid items-start gap-3 md:grid-cols-2 xl:grid-cols-3">
        {overview.cards.map((card) => (
          <InsightCard key={card.metricId} card={card} />
        ))}
      </div>
      <FailureTrendsSection />
    </div>
  );
}
