'use client';

import { ScrollArea } from '@/components/ui/scroll-area';

import { useAlertReviewQuery } from '../../../_hooks/queries/use-alert-review-query';
import { FiredAlertItem } from './fired-alert-item';

export function FiredAlertList() {
  const { data: review } = useAlertReviewQuery();

  if (review.alerts.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center p-6 text-xs text-muted-foreground">
        No alerts fired in this window. All quiet.
      </div>
    );
  }
  return (
    <ScrollArea className="h-100">
      <ul className="flex flex-col divide-y">
        {review.alerts.map((alert) => (
          <FiredAlertItem key={alert.id} alert={alert} />
        ))}
      </ul>
    </ScrollArea>
  );
}
