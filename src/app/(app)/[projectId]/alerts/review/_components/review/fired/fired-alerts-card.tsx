'use client';

import { useAlertReviewQuery } from '../../../_hooks/queries/use-alert-review-query';
import { FiredAlertList } from './fired-alert-list';

const countText = (count: number) => {
  if (count === 1) return '1 alert';
  return `${count} alerts`;
};

export function FiredAlertsCard() {
  const { data: review } = useAlertReviewQuery();

  return (
    <section className="flex min-h-96 min-w-0 flex-col rounded-lg border bg-background">
      <header className="flex items-center justify-between border-b px-3 py-2.5">
        <h2 className="text-xs font-semibold">Alerts that fired</h2>
        <span className="text-[11px] text-muted-foreground">
          {countText(review.alerts.length)}
        </span>
      </header>
      <FiredAlertList />
    </section>
  );
}
