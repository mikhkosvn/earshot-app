import 'server-only';

import {
  JobKind,
  PatternReviewStage,
  PatternReviewStatus,
} from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { UrlGenerator } from '@/lib/url-generator/url-generator';
import { startJob } from '@/server/jobs/start-job';
import { runPatternReview } from '@/server/metrics/pattern-reviews/utils/run-pattern-review';
import type { StartedPatternReview } from '@/server/metrics/types';

type StartPatternReviewArgs = {
  metricId: number;
  projectId: number;
  userId: number | null;
};

export const startPatternReview = async ({
  metricId,
  projectId,
  userId,
}: StartPatternReviewArgs): Promise<StartedPatternReview> => {
  const metric = await prisma.metric.findUniqueOrThrow({
    where: { id: metricId, projectId },
    select: { name: true },
  });
  const review = await prisma.metricPatternReview.create({
    data: {
      metricId,
      status: PatternReviewStatus.pending,
      stage: PatternReviewStage.sampling,
    },
    select: { id: true },
  });
  const { jobId } = await startJob({
    projectId,
    userId,
    kind: JobKind.metric_pattern_review,
    input: { reviewId: review.id, metricId, metricName: metric.name },
    initialStep: 'Sampling recent calls and runs...',
    run: async (context) => {
      await context.setResult({
        summary: `Review ${metric.name}`,
        deepLink: UrlGenerator.metricReview({
          reviewId: review.id,
          values: { project: projectId },
        }),
        reviewId: review.id,
      });
      await runPatternReview({
        reviewId: review.id,
        projectId,
        setStep: context.setStep,
      });
    },
  });
  await prisma.metricPatternReview.update({
    where: { id: review.id },
    data: { jobId },
  });
  return { reviewId: review.id, jobId };
};
