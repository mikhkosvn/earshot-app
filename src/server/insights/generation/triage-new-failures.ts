import 'server-only';

import { startOfDay } from 'date-fns';

import { Prisma } from '@/generated/prisma/client';
import { EvaluationConsumer } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
import {
  readEvaluationCursor,
  settledPrefix,
  writeEvaluationCursor,
} from '@/server/alerts/utils/evaluation-cursor';
import { INSIGHT_TRIAGE_BATCH } from '@/server/insights/constants/insight-limits';
import { classifyFailures } from '@/server/insights/generation/classify-failures';
import {
  type FailureEvaluationRecord,
  failureEvaluationSelect,
  type InsightMetric,
  insightMetricSelect,
  isCallFailure,
  toFailureItem,
} from '@/server/insights/generation/load-failures';
import {
  knownCategoriesOf,
  persistClassification,
} from '@/server/insights/generation/persist-classification';

const remainingToday = async (metricId: number, limit: number | null) => {
  if (limit === null) return Number.POSITIVE_INFINITY;
  const used = await prisma.failureCategoryAssignment.count({
    where: {
      assignedAt: { gte: startOfDay(new Date()) },
      category: { metricId },
    },
  });
  return Math.max(0, limit - used);
};

const triageMetric = async (
  metric: InsightMetric,
  limit: number | null,
  rows: FailureEvaluationRecord[],
) => {
  const failures = rows.filter((row) => isCallFailure(metric, row));
  const allowed = await remainingToday(metric.id, limit);
  const picked = failures.slice(0, allowed);
  if (picked.length === 0) return 0;
  const classification = await classifyFailures({
    metric,
    failures: picked.map(toFailureItem),
    knownCategories: await knownCategoriesOf(metric.id),
  });
  await persistClassification(
    metric.id,
    classification,
    new Map(picked.map((row) => [row.id, row.createdAt])),
  );
  return picked.length;
};

export const triageNewFailures = async () => {
  const cursor = await readEvaluationCursor(EvaluationConsumer.insight_triage);
  const rows = await prisma.metricEvaluation.findMany({
    where: { id: { gt: cursor } },
    orderBy: { id: Prisma.SortOrder.asc },
    take: INSIGHT_TRIAGE_BATCH,
    select: failureEvaluationSelect,
  });
  const ready = settledPrefix(rows);
  const last = ready.at(-1);
  if (!last) return { triaged: 0 };
  const metricIds = [...new Set(ready.map((row) => row.metricId))];
  const configs = await prisma.metricInsightConfig.findMany({
    where: { enabled: true, metricId: { in: metricIds } },
    select: {
      triageFailureLimit: true,
      metric: { select: insightMetricSelect },
    },
  });
  let triaged = 0;
  for (const config of configs) {
    triaged += await triageMetric(
      config.metric,
      config.triageFailureLimit,
      ready.filter((row) => row.metricId === config.metric.id),
    );
  }
  await writeEvaluationCursor(EvaluationConsumer.insight_triage, last.id);
  addEventFields({
    insight_triage: {
      evaluations: ready.length,
      metrics: configs.length,
      triaged,
    },
  });
  return { triaged };
};
