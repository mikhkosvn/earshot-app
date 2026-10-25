import { queryOptions } from '@tanstack/react-query';

import { deferAction } from '@/lib/query-client/defer-action';
import { getPatternReviewAction } from '@/server/metrics/actions';

import { reviewPollInterval } from '../_utils/review-poll-interval';

export const MetricReviewKey = {
  detail: 'metric-pattern-review',
  setCorrection: 'metric-pattern-review-set-correction',
  rebuild: 'metric-pattern-review-rebuild',
} as const;

export type MetricReviewKey =
  (typeof MetricReviewKey)[keyof typeof MetricReviewKey];

export class MetricReviewService {
  static readonly setCorrectionMutationKey = [MetricReviewKey.setCorrection];
  static readonly rebuildMutationKey = [MetricReviewKey.rebuild];

  static getReviewQuery({ reviewId }: { reviewId: number }) {
    return queryOptions({
      queryKey: [MetricReviewKey.detail, reviewId],
      queryFn: () => deferAction(() => getPatternReviewAction({ reviewId })),
      refetchInterval: (query) => reviewPollInterval(query.state.data),
    });
  }
}
