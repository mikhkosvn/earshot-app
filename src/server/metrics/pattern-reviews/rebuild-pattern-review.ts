import 'server-only';

import type { Prisma } from '@/generated/prisma/client';
import {
  JobKind,
  PatternReviewStage,
  PatternReviewStatus,
} from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { UrlGenerator } from '@/lib/url-generator/url-generator';
import { ActionError, withValidation } from '@/server/common/run-action';
import { startJob } from '@/server/jobs/start-job';
import { valueParts } from '@/server/metric-scoring/utils/value-parts';
import {
  patternReviewSelect,
  toPatternReviewView,
} from '@/server/metrics/pattern-reviews/utils/pattern-review-view';
import { requireReviewAccess } from '@/server/metrics/pattern-reviews/utils/require-review-access';
import { reviewIdSchema } from '@/server/metrics/schemas';
import type {
  MetricValue,
  PatternGroupView,
  PatternSampleView,
} from '@/server/metrics/types';

type LabEntry = {
  sample: PatternSampleView;
  expected: MetricValue;
  feedback: string;
};

const labEntries = (groups: PatternGroupView[]): LabEntry[] =>
  groups.flatMap((group) => {
    if (group.correction) {
      const correction = group.correction;
      return [group.representative, ...group.others]
        .filter((sample) => sample !== null)
        .map((sample) => ({
          sample,
          expected: correction.value,
          feedback: correction.note,
        }));
    }
    if (!group.representative) return [];
    return [
      {
        sample: group.representative,
        expected: group.representative.verdict,
        feedback: '',
      },
    ];
  });

const saveLabEntry = async (
  tx: Prisma.TransactionClient,
  metricId: number,
  entry: LabEntry,
) => {
  const testSet = await tx.labTestSet.upsert({
    where: { conversationId: entry.sample.conversationId },
    create: { conversationId: entry.sample.conversationId },
    update: {},
    select: { id: true },
  });
  const expected = valueParts(entry.expected);
  const actual = valueParts(entry.sample.verdict);
  const values = {
    expectedNumber: expected.number,
    expectedBoolean: expected.boolean,
    expectedText: expected.text,
    actualNumber: actual.number,
    actualBoolean: actual.boolean,
    actualText: actual.text,
    actualExplanation: entry.sample.explanation,
    actualEvaluatedAt: new Date(),
    feedback: entry.feedback || null,
  };
  await tx.labReview.upsert({
    where: { testSetId_metricId: { testSetId: testSet.id, metricId } },
    create: { testSetId: testSet.id, metricId, ...values },
    update: values,
  });
};

const saveRebuild = (reviewId: number, metricId: number, entries: LabEntry[]) =>
  prisma.$transaction(async (tx) => {
    for (const entry of entries) {
      await saveLabEntry(tx, metricId, entry);
    }
    await tx.metricPatternReview.update({
      where: { id: reviewId },
      data: {
        status: PatternReviewStatus.completed,
        stage: null,
        rebuiltAt: new Date(),
        roundIndex: { increment: 1 },
      },
    });
  });

export const rebuildPatternReview = withValidation(
  reviewIdSchema,
  async ({ reviewId }) => {
    const { user, review } = await requireReviewAccess(reviewId);
    const row = await prisma.metricPatternReview.findUniqueOrThrow({
      where: { id: reviewId },
      select: patternReviewSelect,
    });
    const view = toPatternReviewView(row);
    if (!view.groups.some((group) => group.correction)) {
      throw new ActionError('Fix at least one group before you rebuild.');
    }
    const projectId = review.metric.projectId;
    await prisma.metricPatternReview.update({
      where: { id: reviewId },
      data: {
        status: PatternReviewStatus.rebuilding,
        stage: PatternReviewStage.reading_fixes,
      },
    });
    return startJob({
      projectId,
      userId: user.id,
      kind: JobKind.metric_pattern_review,
      input: { reviewId, rebuild: true },
      initialStep: 'Reading your fixes...',
      run: async (context) => {
        const entries = labEntries(view.groups);
        await saveRebuild(reviewId, review.metricId, entries).catch(
          async (error: unknown) => {
            await prisma.metricPatternReview.update({
              where: { id: reviewId },
              data: {
                status: PatternReviewStatus.failed,
                stage: null,
                error: 'The rebuild failed.',
              },
            });
            throw error;
          },
        );
        await context.setStep('Metric review completed.');
        await context.setResult({
          summary: 'Metric review completed.',
          deepLink: UrlGenerator.metricReview({
            reviewId,
            values: { project: projectId },
          }),
          savedToLabs: entries.length,
        });
      },
    });
  },
);
