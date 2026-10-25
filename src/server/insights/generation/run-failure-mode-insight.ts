import 'server-only';

import { InsightStatus } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { INSIGHT_RUN_FAILURES_MAX } from '@/server/insights/constants/insight-limits';
import { classifyFailures } from '@/server/insights/generation/classify-failures';
import {
  insightMetricSelect,
  isCallFailure,
  loadWindowEvaluations,
  toFailureItem,
} from '@/server/insights/generation/load-failures';
import {
  knownCategoriesOf,
  persistClassification,
} from '@/server/insights/generation/persist-classification';

const MILLISECONDS_PER_SECOND = 1000;
const WINDOW_EVALUATIONS_MAX = 5000;

interface RunArgs {
  metricId: number;
  windowStart: Date;
  windowEnd: Date;
}

export interface InsightRunOutcome {
  insightId: number;
  status: InsightStatus;
  failures: number;
  categories: number;
}

const errorText = (error: unknown) => {
  if (error instanceof Error && error.message) return error.message;
  return 'The insight run failed.';
};

const classifyAndStore = async (
  insightId: number,
  metric: Awaited<ReturnType<typeof loadMetric>>,
  windowStart: Date,
  windowEnd: Date,
): Promise<InsightRunOutcome> => {
  const evaluations = await loadWindowEvaluations(
    metric.id,
    windowStart,
    windowEnd,
    WINDOW_EVALUATIONS_MAX,
  );
  const failures = evaluations
    .filter((row) => isCallFailure(metric, row))
    .slice(0, INSIGHT_RUN_FAILURES_MAX);
  const counts = {
    numCallsAnalyzed: evaluations.length,
    totalFailuresInWindow: failures.length,
  };
  if (failures.length === 0) {
    await prisma.failureModeInsight.update({
      where: { id: insightId },
      data: {
        ...counts,
        status: InsightStatus.skipped_no_failures,
        headline: 'No failures in this window. Nothing to group.',
      },
    });
    return {
      insightId,
      status: InsightStatus.skipped_no_failures,
      failures: 0,
      categories: 0,
    };
  }
  const classification = await classifyFailures({
    metric,
    failures: failures.map(toFailureItem),
    knownCategories: await knownCategoriesOf(metric.id),
  });
  const stored = await persistClassification(
    metric.id,
    classification,
    new Map(failures.map((row) => [row.id, row.createdAt])),
  );
  const ranked = [...stored.counts.entries()].toSorted(
    (left, right) => right[1] - left[1],
  );
  const summaries = new Map(
    classification.categories.map((category) => [
      stored.categoryIds.get(category.slug),
      category.summary,
    ]),
  );
  await prisma.failureModeInsight.update({
    where: { id: insightId },
    data: {
      ...counts,
      status: InsightStatus.succeeded,
      headline: classification.headline,
      categories: {
        create: ranked.map(([categoryId], index) => ({
          categoryId,
          rank: index + 1,
          summary: summaries.get(categoryId) ?? null,
        })),
      },
    },
  });
  return {
    insightId,
    status: InsightStatus.succeeded,
    failures: failures.length,
    categories: ranked.length,
  };
};

const loadMetric = (metricId: number) =>
  prisma.metric.findUniqueOrThrow({
    where: { id: metricId },
    select: insightMetricSelect,
  });

export const runFailureModeInsight = async ({
  metricId,
  windowStart,
  windowEnd,
}: RunArgs): Promise<InsightRunOutcome> => {
  const metric = await loadMetric(metricId);
  const started = Date.now();
  const insight = await prisma.failureModeInsight.create({
    data: { metricId, windowStart, windowEnd, status: InsightStatus.running },
    select: { id: true },
  });
  try {
    const outcome = await classifyAndStore(
      insight.id,
      metric,
      windowStart,
      windowEnd,
    );
    await prisma.failureModeInsight.update({
      where: { id: insight.id },
      data: {
        durationSeconds: (Date.now() - started) / MILLISECONDS_PER_SECOND,
      },
    });
    return outcome;
  } catch (error) {
    await prisma.failureModeInsight.update({
      where: { id: insight.id },
      data: {
        status: InsightStatus.failed,
        errorMessage: errorText(error),
        durationSeconds: (Date.now() - started) / MILLISECONDS_PER_SECOND,
      },
    });
    throw error;
  }
};
