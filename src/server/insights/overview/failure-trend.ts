import 'server-only';

import type { OverviewAssignment } from '@/server/insights/overview/get-insights-overview';
import type {
  FailureTrendSeries,
  InsightCardView,
} from '@/server/insights/types';

const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;
const HOURLY_RANGE_MAX_MS = 2 * DAY_MS;

const bucketSizeOf = (rangeMs: number) => {
  if (rangeMs <= HOURLY_RANGE_MAX_MS) return HOUR_MS;
  return DAY_MS;
};

export const categoryKey = (categoryId: number) => `category-${categoryId}`;

export const failureTrendOf = (
  cards: InsightCardView[],
  assignments: OverviewAssignment[],
  windowStart: Date,
  windowEnd: Date,
): FailureTrendSeries[] => {
  const start = windowStart.getTime();
  const bucketMs = bucketSizeOf(windowEnd.getTime() - start);
  const bucketCount = Math.max(
    1,
    Math.ceil((windowEnd.getTime() - start) / bucketMs),
  );
  return cards.map((card) => {
    const points = Array.from({ length: bucketCount }, (_, index) => ({
      bucketStart: new Date(start + index * bucketMs),
      counts: {} as Record<string, number>,
    }));
    assignments
      .filter((row) => row.category.metricId === card.metricId)
      .forEach((row) => {
        const index = Math.min(
          bucketCount - 1,
          Math.floor((row.assignedAt.getTime() - start) / bucketMs),
        );
        const key = categoryKey(row.categoryId);
        points[index].counts[key] = (points[index].counts[key] ?? 0) + 1;
      });
    return {
      metricId: card.metricId,
      metricName: card.metricName,
      categories: card.categories.map((category) => ({
        key: categoryKey(category.id),
        name: category.name,
      })),
      points,
    };
  });
};
