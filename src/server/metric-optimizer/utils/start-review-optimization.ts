import 'server-only';

import { prisma } from '@/lib/prisma';
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
    console.error(
      `[metric-optimizer] The review ${reviewId} did not start an optimisation of metric ${metricId}.`,
      error,
    );
    return null;
  }
};
