import 'server-only';

import { subDays } from 'date-fns';

import { Prisma } from '@/generated/prisma/client';
import {
  MetricEvaluationStatus,
  PatternReviewStage,
  PatternReviewStatus,
} from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { scoreConversation } from '@/server/metric-scoring/score-conversation';
import {
  valueFromParts,
  valueParts,
} from '@/server/metric-scoring/utils/value-parts';
import {
  PATTERN_REVIEW_HISTORY_DAYS,
  PATTERN_REVIEW_MAX_SAMPLES,
  PATTERN_REVIEW_MIN_SAMPLES,
} from '@/server/metrics/constants/pattern-review/pattern-review-limits';
import {
  groupSamples,
  type ReviewSample,
  type SampleGroup,
} from '@/server/metrics/pattern-reviews/utils/group-samples';
import type { MetricValue } from '@/server/metrics/types';

interface RunPatternReviewArgs {
  reviewId: number;
  projectId: number;
  setStep: (text: string) => Promise<void>;
}

const errorText = (error: unknown) => {
  if (error instanceof Error && error.message) return error.message;
  return 'The review failed.';
};

const recentConversationIds = async (projectId: number) => {
  const rows = await prisma.conversation.findMany({
    where: {
      projectId,
      createdAt: { gte: subDays(new Date(), PATTERN_REVIEW_HISTORY_DAYS) },
      turns: { some: {} },
      OR: [{ run: { isNot: null } }, { callLog: { isNot: null } }],
    },
    orderBy: { createdAt: Prisma.SortOrder.desc },
    take: PATTERN_REVIEW_MAX_SAMPLES,
    select: { id: true },
  });
  return rows.map((row) => row.id);
};

const sampleError = (
  evaluation:
    { status: MetricEvaluationStatus; errorMessage: string | null } | undefined,
) => {
  if (evaluation?.status !== MetricEvaluationStatus.failed) return null;
  return evaluation.errorMessage ?? 'The metric failed.';
};

const scoreSample = async (
  projectId: number,
  metricId: number,
  conversationId: number,
): Promise<ReviewSample> => {
  const evaluations = await scoreConversation({
    projectId,
    conversationId,
    metricIds: [metricId],
  });
  const evaluation = evaluations.find((row) => row.metricId === metricId);
  const turns = await prisma.transcriptTurn.findMany({
    where: { conversationId },
    orderBy: { position: Prisma.SortOrder.asc },
    select: { role: true, content: true, startTime: true },
  });
  return {
    conversationId,
    verdict: valueFromParts({
      number: evaluation?.valueNumber ?? null,
      boolean: evaluation?.valueBoolean ?? null,
      text: evaluation?.valueText ?? null,
    }),
    skipped: evaluation?.status === MetricEvaluationStatus.skipped,
    error: sampleError(evaluation),
    explanation: evaluation?.explanation ?? [],
    turns,
  };
};

const majorityVerdict = (members: ReviewSample[]) => {
  const counts = new Map<string, { value: MetricValue; count: number }>();
  for (const member of members) {
    const key = JSON.stringify(member.verdict);
    const entry = counts.get(key) ?? { value: member.verdict, count: 0 };
    counts.set(key, { ...entry, count: entry.count + 1 });
  }
  const sorted = [...counts.values()].toSorted(
    (left, right) => right.count - left.count,
  );
  return { verdict: sorted[0]?.value ?? null, inconsistent: sorted.length > 1 };
};

const writeGroup = async (
  tx: Prisma.TransactionClient,
  args: {
    reviewId: number;
    position: number;
    group: SampleGroup;
    samples: Map<number, ReviewSample>;
  },
) => {
  const members = args.group.conversationIds.flatMap((id) => {
    const sample = args.samples.get(id);
    if (!sample) return [];
    return [sample];
  });
  const { verdict, inconsistent } = majorityVerdict(members);
  const parts = valueParts(verdict);
  const created = await tx.patternReviewGroup.create({
    data: {
      reviewId: args.reviewId,
      key: `p${args.position}`,
      position: args.position,
      label: args.group.label,
      summary: args.group.summary,
      verdictNumber: parts.number,
      verdictBoolean: parts.boolean,
      verdictText: parts.text,
      inconsistent,
      evidence: {
        create: args.group.evidence.map((line, position) => ({
          position,
          speaker: line.speaker,
          timeSeconds: line.timeSeconds,
          text: line.text,
          isKey: line.isKey,
        })),
      },
      samples: {
        create: members.map((member) => {
          const memberParts = valueParts(member.verdict);
          return {
            conversationId: member.conversationId,
            verdictNumber: memberParts.number,
            verdictBoolean: memberParts.boolean,
            verdictText: memberParts.text,
            skipped: member.skipped,
            error: member.error,
            explanation: member.explanation,
          };
        }),
      },
    },
    select: {
      id: true,
      samples: { select: { id: true, conversationId: true } },
    },
  });
  const representative =
    created.samples.find(
      (sample) => sample.conversationId === args.group.representativeId,
    ) ?? created.samples[0];
  if (!representative) return;
  await tx.patternReviewGroup.update({
    where: { id: created.id },
    data: { representativeSampleId: representative.id },
  });
};

const finishInsufficient = (reviewId: number) =>
  prisma.metricPatternReview.update({
    where: { id: reviewId },
    data: {
      status: PatternReviewStatus.ready,
      stage: null,
      insufficientHistory: true,
    },
  });

const reviewSamples = async (args: RunPatternReviewArgs) => {
  const review = await prisma.metricPatternReview.update({
    where: { id: args.reviewId },
    data: {
      status: PatternReviewStatus.running,
      stage: PatternReviewStage.sampling,
      error: null,
    },
    select: { metricId: true, metric: { select: { name: true } } },
  });
  const conversationIds = await recentConversationIds(args.projectId);
  if (conversationIds.length < PATTERN_REVIEW_MIN_SAMPLES) {
    await finishInsufficient(args.reviewId);
    return;
  }
  const samples: ReviewSample[] = [];
  for (const [index, conversationId] of conversationIds.entries()) {
    await args.setStep(
      `Labeling sample ${index + 1} of ${conversationIds.length}...`,
    );
    samples.push(
      await scoreSample(args.projectId, review.metricId, conversationId),
    );
  }
  await prisma.metricPatternReview.update({
    where: { id: args.reviewId },
    data: { stage: PatternReviewStage.grouping },
  });
  await args.setStep('Grouping the samples into patterns...');
  const groups = await groupSamples(samples, review.metric.name);
  const sampleById = new Map(
    samples.map((sample) => [sample.conversationId, sample]),
  );
  await prisma.$transaction(async (tx) => {
    await tx.patternReviewGroup.deleteMany({
      where: { reviewId: args.reviewId },
    });
    for (const [index, group] of groups.entries()) {
      await writeGroup(tx, {
        reviewId: args.reviewId,
        position: index + 1,
        group,
        samples: sampleById,
      });
    }
    await tx.metricPatternReview.update({
      where: { id: args.reviewId },
      data: {
        status: PatternReviewStatus.ready,
        stage: null,
        insufficientHistory: false,
      },
    });
  });
  await args.setStep('The sample labels are ready.');
};

export const runPatternReview = async (args: RunPatternReviewArgs) => {
  try {
    await reviewSamples(args);
  } catch (error) {
    await prisma.metricPatternReview.update({
      where: { id: args.reviewId },
      data: {
        status: PatternReviewStatus.failed,
        stage: null,
        error: errorText(error),
      },
    });
    throw error;
  }
};
