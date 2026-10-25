import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { withValidation } from '@/server/common/run-action';
import { INSIGHT_CATEGORY_EXAMPLES } from '@/server/insights/constants/insight-limits';
import { failureTrendOf } from '@/server/insights/overview/failure-trend';
import { insightRangeSchema } from '@/server/insights/schemas';
import type {
  InsightCardView,
  InsightCategoryView,
  InsightsOverview,
} from '@/server/insights/types';
import { insightWindowOf } from '@/server/insights/utils/insight-window';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

const assignmentSelect = {
  categoryId: true,
  explanation: true,
  assignedAt: true,
  metricEvaluationId: true,
  category: {
    select: { id: true, metricId: true, name: true, description: true },
  },
  metricEvaluation: {
    select: {
      conversation: {
        select: {
          callLog: { select: { id: true, externalCallId: true } },
        },
      },
    },
  },
} satisfies Prisma.FailureCategoryAssignmentSelect;

export type OverviewAssignment = Prisma.FailureCategoryAssignmentGetPayload<{
  select: typeof assignmentSelect;
}>;

const callLogWhere = (
  agentId: number | null,
): Prisma.CallLogNullableScalarRelationFilter => {
  if (agentId === null) return { isNot: null };
  return { is: { agentId } };
};

const categoriesOf = (rows: OverviewAssignment[]): InsightCategoryView[] => {
  const groups = new Map<number, OverviewAssignment[]>();
  rows.forEach((row) => {
    const list = groups.get(row.categoryId) ?? [];
    list.push(row);
    groups.set(row.categoryId, list);
  });
  return [...groups.values()]
    .map((list) => ({
      id: list[0].category.id,
      name: list[0].category.name,
      description: list[0].category.description,
      count: list.length,
      examples: list.slice(0, INSIGHT_CATEGORY_EXAMPLES).map((row) => ({
        evaluationId: row.metricEvaluationId,
        callLogId: row.metricEvaluation.conversation.callLog?.id ?? null,
        externalCallId:
          row.metricEvaluation.conversation.callLog?.externalCallId ?? null,
        explanation: row.explanation,
        assignedAt: row.assignedAt,
      })),
    }))
    .toSorted((left, right) => right.count - left.count);
};

export const getInsightsOverview = withValidation(
  insightRangeSchema,
  async ({ projectId, from, to, agentId }): Promise<InsightsOverview> => {
    await requireProjectAccess(projectId);
    const { windowStart, windowEnd } = insightWindowOf(from, to);
    const configs = await prisma.metricInsightConfig.findMany({
      where: { enabled: true, metric: { projectId } },
      orderBy: [
        { position: Prisma.SortOrder.asc },
        { metricId: Prisma.SortOrder.asc },
      ],
      select: {
        alertOnNewCategories: true,
        metric: { select: { id: true, name: true, evalType: true } },
      },
    });
    const metricIds = configs.map((config) => config.metric.id);
    const [assignments, insights] = await Promise.all([
      prisma.failureCategoryAssignment.findMany({
        where: {
          assignedAt: { gte: windowStart, lte: windowEnd },
          category: { metricId: { in: metricIds }, dismissedAt: null },
          metricEvaluation: {
            conversation: { callLog: callLogWhere(agentId) },
          },
        },
        orderBy: { assignedAt: Prisma.SortOrder.desc },
        select: assignmentSelect,
      }),
      prisma.failureModeInsight.findMany({
        where: { metricId: { in: metricIds } },
        orderBy: { createdAt: Prisma.SortOrder.desc },
        distinct: ['metricId'],
        select: {
          id: true,
          metricId: true,
          status: true,
          headline: true,
          errorMessage: true,
          numCallsAnalyzed: true,
          totalFailuresInWindow: true,
          windowStart: true,
          windowEnd: true,
          createdAt: true,
        },
      }),
    ]);
    const cards: InsightCardView[] = configs.map(({ metric, ...config }) => {
      const rows = assignments.filter(
        (row) => row.category.metricId === metric.id,
      );
      const latest = insights.find((insight) => insight.metricId === metric.id);
      return {
        metricId: metric.id,
        metricName: metric.name,
        evalType: metric.evalType,
        alertOnNewCategories: config.alertOnNewCategories,
        failures: rows.length,
        categories: categoriesOf(rows),
        latestInsight: latest ?? null,
      };
    });
    return {
      cards,
      trends: failureTrendOf(cards, assignments, windowStart, windowEnd),
    };
  },
);
