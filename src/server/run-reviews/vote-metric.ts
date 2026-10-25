import 'server-only';

import { prisma } from '@/lib/prisma';
import { requireUser } from '@/server/auth';
import { withValidation } from '@/server/common/run-action';
import { normalizeScore } from '@/server/metric-scoring/utils/normalize-score';
import { valueParts } from '@/server/metric-scoring/utils/value-parts';
import { projectAccessWhere } from '@/server/projects/utils/project-access-where';
import { voteMetricSchema } from '@/server/run-reviews/schemas';

export const voteMetric = withValidation(
  voteMetricSchema,
  async ({ conversationId, metricId, thumbsUp, expectedValue, feedback }) => {
    const { user } = await requireUser();
    const evaluation = await prisma.metricEvaluation.findFirstOrThrow({
      where: {
        conversationId,
        metricId,
        conversation: { project: projectAccessWhere(user.id) },
      },
      select: { id: true, metric: { select: { evalType: true } } },
    });
    const vote = { thumbsUp, voteFeedback: feedback, votedAt: new Date() };
    if (thumbsUp) {
      await prisma.metricEvaluation.update({
        where: { id: evaluation.id },
        data: vote,
      });
      return { success: true };
    }
    const parts = valueParts(expectedValue);
    await prisma.metricEvaluation.update({
      where: { id: evaluation.id },
      data: {
        ...vote,
        valueNumber: parts.number,
        valueBoolean: parts.boolean,
        valueText: parts.text,
        normalizedScore: normalizeScore(
          evaluation.metric.evalType,
          expectedValue,
        ),
      },
    });
    return { success: true };
  },
);
