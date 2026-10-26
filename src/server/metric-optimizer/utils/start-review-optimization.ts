import 'server-only';

import { prisma } from '@/lib/prisma';
import { recordStepFailure } from '@/server/common/logging/event-fields';
import { MetricOptimizerStep } from '@/server/metric-optimizer/constants/optimizer-step';
import { queueOptimization } from '@/server/metric-optimizer/utils/queue-optimization';

export const startReviewOptimization = async (
  reviewId: number,
  metricId: number,
  userId: number,
) => {
  try {
    const queued = await queueOptimization({ metricId, userId, draft: null });
    await prisma.metricPatternReview.update({
      where: { id: reviewId },
      data: { optimizationSessionId: queued.sessionId },
    });
    return queued;
  } catch (error) {
    recordStepFailure(MetricOptimizerStep.review_optimization, error);
    return null;
  }
};
