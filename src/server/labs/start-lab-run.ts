import 'server-only';

import { JobKind } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { UrlGenerator } from '@/lib/url-generator/url-generator';
import { addEventFields } from '@/server/common/logging/event-fields';
import { ActionError, withValidation } from '@/server/common/run-action';
import { ACTIVE_JOB_STATUSES } from '@/server/jobs/constants';
import { startJob } from '@/server/jobs/start-job';
import { LAB_RUN_INPUT_KEY } from '@/server/labs/constants/lab-run';
import { startLabRunSchema } from '@/server/labs/schemas';
import type { LabRowOutcome, LabRunJobResult } from '@/server/labs/types';
import {
  applyDraft,
  loadScoringMetric,
} from '@/server/labs/utils/draft-metric';
import { labRunWhere } from '@/server/labs/utils/lab-run-view';
import {
  type ConversationCache,
  loadScoringReviews,
  scoreLabReview,
} from '@/server/labs/utils/score-lab-reviews';
import { valuesMatch } from '@/server/labs/utils/values-match';
import {
  valueFromParts,
  valueParts,
} from '@/server/metric-scoring/utils/value-parts';
import { requireMetricAccess } from '@/server/metrics/utils/require-metric-access';

const previousValueOf = async (reviewId: number) => {
  const row = await prisma.labReview.findUniqueOrThrow({
    where: { id: reviewId },
    select: { actualNumber: true, actualBoolean: true, actualText: true },
  });
  return valueFromParts({
    number: row.actualNumber,
    boolean: row.actualBoolean,
    text: row.actualText,
  });
};

const saveOutcome = async (outcome: LabRowOutcome) => {
  const previous = await previousValueOf(outcome.reviewId);
  const parts = valueParts(outcome.value);
  await prisma.labReview.update({
    where: { id: outcome.reviewId },
    data: {
      actualNumber: parts.number,
      actualBoolean: parts.boolean,
      actualText: parts.text,
      actualExplanation: outcome.explanation,
      actualEvaluatedAt: new Date(),
    },
  });
  return !valuesMatch(previous, outcome.value);
};

const assertNoActiveRun = async (projectId: number, metricId: number) => {
  const active = await prisma.backgroundJob.count({
    where: {
      ...labRunWhere(projectId, metricId),
      status: { in: ACTIVE_JOB_STATUSES },
    },
  });
  if (active > 0) {
    throw new ActionError('A run of this metric is already in progress.');
  }
};

const rowWord = (count: number) => {
  if (count === 1) return 'row';
  return 'rows';
};

export const startLabRun = withValidation(
  startLabRunSchema,
  async ({ metricId, draft }) => {
    const { user, metric } = await requireMetricAccess(metricId);
    const projectId = metric.projectId;
    await assertNoActiveRun(projectId, metricId);
    const reviews = await loadScoringReviews(metricId);
    const scoringMetric = applyDraft(await loadScoringMetric(metricId), draft);
    const job = await startJob({
      projectId,
      userId: user.id,
      kind: JobKind.reevaluation,
      input: { [LAB_RUN_INPUT_KEY]: metricId, metricName: metric.name },
      initialStep: `Running ${metric.name} on ${reviews.length} lab ${rowWord(reviews.length)}...`,
      run: async (context) => {
        const cache: ConversationCache = new Map();
        const changedReviewIds: number[] = [];
        let matched = 0;
        for (const [index, review] of reviews.entries()) {
          const outcome = await scoreLabReview(
            projectId,
            scoringMetric,
            review,
            cache,
          );
          if (await saveOutcome(outcome)) changedReviewIds.push(review.id);
          if (outcome.matched) matched += 1;
          await context.setStep(
            `Scored ${index + 1} of ${reviews.length} lab ${rowWord(reviews.length)}.`,
          );
        }
        const result: LabRunJobResult = {
          summary: `${metric.name}: ${matched}/${reviews.length} lab rows match the expected value.`,
          deepLink: UrlGenerator.labEdit({ metricId }),
          metricId,
          matched,
          total: reviews.length,
          changedReviewIds,
        };
        addEventFields({
          metric: { id: metricId },
          lab_run: {
            matched,
            total: reviews.length,
            changed: changedReviewIds.length,
          },
        });
        await context.setResult(result);
      },
    });
    addEventFields({
      metric: { id: metricId },
      lab_run: { review_count: reviews.length },
      job: { id: job.jobId },
    });
    return job;
  },
);
