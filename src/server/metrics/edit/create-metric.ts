import 'server-only';

import {
  ComparisonOperator,
  MetricEvalType,
  MetricType,
} from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { withValidation } from '@/server/common/run-action';
import { startPatternReview } from '@/server/metrics/pattern-reviews/start-pattern-review';
import { createMetricSchema } from '@/server/metrics/schemas';
import type { CreatedMetric } from '@/server/metrics/types';
import { createMetricRecord } from '@/server/metrics/utils/records/create-metric-record';
import { filterProjectAgentIds } from '@/server/metrics/utils/records/project-agent-ids';
import { scoreScenarioHistory } from '@/server/metrics/utils/score-scenario-history';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';
import { addRubricRule } from '@/server/rubric/utils/add-rubric-rule';

export const createMetric = withValidation(
  createMetricSchema,
  async ({
    projectId,
    agentIds,
    scenarioIds,
    addToRubric,
    ...definition
  }): Promise<CreatedMetric> => {
    const { user } = await requireProjectAccess(projectId);
    const { metric, linkedScenarioIds } = await prisma.$transaction(
      async (tx) => {
        const created = await createMetricRecord(tx, {
          ...definition,
          projectId,
          userId: user.id,
          agentIds: await filterProjectAgentIds(tx, projectId, agentIds),
        });
        if (addToRubric && definition.evalType === MetricEvalType.binary) {
          await addRubricRule(tx, {
            metricId: created.id,
            projectId,
            operator: ComparisonOperator.eq,
            booleanValue: true,
          });
        }
        const evaluators = await tx.evaluator.findMany({
          where: { projectId, id: { in: scenarioIds } },
          select: { id: true },
        });
        await tx.evaluatorMetric.createMany({
          data: evaluators.map((evaluator) => ({
            evaluatorId: evaluator.id,
            metricId: created.id,
          })),
          skipDuplicates: true,
        });
        return {
          metric: created,
          linkedScenarioIds: evaluators.map((evaluator) => evaluator.id),
        };
      },
    );
    await scoreScenarioHistory({
      projectId,
      userId: user.id,
      metricId: metric.id,
      evaluatorIds: linkedScenarioIds,
    });
    if (definition.type !== MetricType.llm_judge) {
      return { id: metric.id, name: metric.name, reviewId: null };
    }
    const review = await startPatternReview({
      metricId: metric.id,
      projectId,
      userId: user.id,
    });
    return { id: metric.id, name: metric.name, reviewId: review.reviewId };
  },
);
