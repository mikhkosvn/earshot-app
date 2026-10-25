'use client';

import { useAlertReviewQuery } from '../../../_hooks/queries/use-alert-review-query';
import { firesText } from '../../../_utils/fires-text';

export function TopAlertValue() {
  const { data: review } = useAlertReviewQuery();
  const topAlert = review.summary.topAlert;

  if (!topAlert) return '—';
  return (
    <span className="flex items-baseline gap-2">
      <span className="truncate text-base">{topAlert.name}</span>
      <span className="shrink-0 text-xs font-normal text-muted-foreground">
        {firesText(topAlert.count)}
      </span>
    </span>
  );
}
