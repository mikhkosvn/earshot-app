'use client';

import { format } from 'date-fns';

import { useAlertReviewQuery } from '../../../_hooks/queries/use-alert-review-query';
import { ActivityChart } from './activity-chart';

const UPDATED_FORMAT = 'h:mm:ss a';

export function ActivityCard() {
  const { data: review } = useAlertReviewQuery();

  return (
    <section className="flex min-w-0 flex-col rounded-lg border bg-background">
      <header className="flex items-center justify-between border-b px-3 py-2.5">
        <h2 className="text-xs font-semibold">Activity</h2>
        <span
          suppressHydrationWarning
          className="text-[11px] text-muted-foreground"
        >
          Updated {format(review.generatedAt, UPDATED_FORMAT)}
        </span>
      </header>
      <div className="p-3">
        <ActivityChart />
      </div>
    </section>
  );
}
