'use client';

import { useAlertReviewQuery } from '../../../_hooks/queries/use-alert-review-query';
import { StatCard } from './stat-card';
import { TopAlertValue } from './top-alert-value';

export function AlertStatCards() {
  const { data: review } = useAlertReviewQuery();

  return (
    <div className="grid gap-3 md:grid-cols-3">
      <StatCard label="Total fires">{review.summary.totalFires}</StatCard>
      <StatCard label="Unique alerts fired">
        {review.summary.uniqueAlerts}
      </StatCard>
      <StatCard label="Top firing alert">
        <TopAlertValue />
      </StatCard>
    </div>
  );
}
