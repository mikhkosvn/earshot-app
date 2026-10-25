'use client';

import type { InsightCardView } from '@/server/insights/types';

import { InsightCategoryList } from '../categories/insight-category-list';
import { InsightCardMenu } from './insight-card-menu';
import { InsightCardStats } from './insight-card-stats';
import { LatestInsightLine } from './latest-insight-line';
import { RunInsightButton } from './run-insight-button';

interface InsightCardProps {
  card: InsightCardView;
}

export function InsightCard({ card }: InsightCardProps) {
  return (
    <section className="flex flex-col rounded-lg border bg-background">
      <header className="flex items-center justify-between gap-2 border-b px-3 py-2">
        <h2 className="truncate text-xs font-semibold">{card.metricName}</h2>
        <div className="flex shrink-0 items-center gap-1">
          <RunInsightButton metricId={card.metricId} />
          <InsightCardMenu card={card} />
        </div>
      </header>
      <LatestInsightLine insight={card.latestInsight} />
      <InsightCategoryList categories={card.categories} />
      <InsightCardStats card={card} />
    </section>
  );
}
