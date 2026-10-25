import 'server-only';

import { OptimizationStatus } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { UrlGenerator } from '@/lib/url-generator/url-generator';
import type { JobContext } from '@/server/jobs/types';
import type { LabDraft, LabRowOutcome } from '@/server/labs/types';
import { applyDraft, loadScoringMetric } from '@/server/labs/utils/draft-metric';
import {
  labRowOrder,
  labRowSelect,
  toLabRowView,
} from '@/server/labs/utils/lab-row-view';
import {
  type ConversationCache,
  scoreLabReview,
} from '@/server/labs/utils/score-lab-reviews';
import { OPTIMIZER_ITERATION_BUDGET } from '@/server/metric-optimizer/constants/optimizer-limits';
import {
  type MetricProposal,
  type OptimizerRow,
  proposeMetric,
  summaryText,
} from '@/server/metric-optimizer/utils/propose-metric';
import { valueParts } from '@/server/metric-scoring/utils/value-parts';
import type { ScoringMetric } from '@/server/metric-scoring/types';

type RunOptimizationArgs = {
  sessionId: number;
  draft: LabDraft | null;
  context: JobContext<unknown>;
};

type LabReviewRow = Awaited<ReturnType<typeof loadSessionReviews>>[number];

type Attempt = {
  proposal: MetricProposal;
  outcomes: LabRowOutcome[];
  matched: number;
};

const loadSessionReviews = (sessionId: number, metricId: number) =>
  prisma.labReview.findMany({
    where: {
      metricId,
      testSet: { optimizations: { some: { sessionId } } },
    },
    orderBy: labRowOrder,
    select: labRowSelect,
  });

const scoreAll = async (
  projectId: number,
  metric: ScoringMetric,
  reviews: LabReviewRow[],
  cache: ConversationCache,
) => {
  const outcomes: LabRowOutcome[] = [];
  for (const review of reviews) {
    outcomes.push(await scoreLabReview(projectId, metric, review, cache));
  }
  return outcomes;
};

const matchedCount = (outcomes: LabRowOutcome[]) =>
  outcomes.filter((outcome) => outcome.matched).length;

const optimizerRows = (
  reviews: LabReviewRow[],
  outcomes: LabRowOutcome[],
): OptimizerRow[] =>
  reviews.map((review, index) => {
    const view = toLabRowView(review);
    const outcome = outcomes[index];
    return {
      reviewId: review.id,
      expected: view.expected,
      actual: outcome.value,
      matched: outcome.matched,
      feedback: view.feedback,
      explanation: outcome.explanation,
      transcript: view.transcript,
    };
  });

const betterAttempt = (best: Attempt | null, next: Attempt) => {
  if (!best || next.matched > best.matched) return next;
  return best;
};

const textOrNull = (value: string) => {
  if (!value.trim()) return null;
  return value;
};

const saveAttempt = async (
  sessionId: number,
  baseline: number,
  total: number,
  attempt: Attempt,
) => {
  const { _max } = await prisma.metricOptimizationProposal.aggregate({
    where: { sessionId },
    _max: { version: true },
  });
  const { proposal } = attempt;
  await prisma.$transaction([
    prisma.metricOptimizationProposal.create({
      data: {
        sessionId,
        version: (_max.version ?? 0) + 1,
        type: proposal.type,
        description: proposal.description,
        customCode: textOrNull(proposal.customCode),
        evaluationTrigger: proposal.evaluationTrigger,
        triggerType: proposal.triggerType,
        evaluationTriggerPrompt: textOrNull(proposal.evaluationTriggerPrompt),
        evaluationTriggerCustomCode: textOrNull(
          proposal.evaluationTriggerCustomCode,
        ),
        reviewResults: {
          create: attempt.outcomes.map((outcome) => {
            const parts = valueParts(outcome.value);
            return {
              labReviewId: outcome.reviewId,
              actualNumber: parts.number,
              actualBoolean: parts.boolean,
              actualText: parts.text,
              explanation: outcome.explanation,
              matched: outcome.matched,
            };
          }),
        },
      },
    }),
    prisma.metricOptimizationSession.update({
      where: { id: sessionId },
      data: {
        status: OptimizationStatus.awaiting_review,
        summary: summaryText(proposal.summary),
        oldCorrectCount: baseline,
        oldTotalCount: total,
        newCorrectCount: attempt.matched,
        newTotalCount: total,
      },
    }),
  ]);
};

const withDraft = (metric: ScoringMetric, draft: LabDraft | null) => {
  if (!draft) return metric;
  return applyDraft(metric, draft);
};

const markFailed = (sessionId: number) =>
  prisma.metricOptimizationSession.update({
    where: { id: sessionId },
    data: { status: OptimizationStatus.failed },
  });

const optimize = async ({ sessionId, draft, context }: RunOptimizationArgs) => {
  const session = await prisma.metricOptimizationSession.update({
    where: { id: sessionId },
    data: { status: OptimizationStatus.running },
    select: { metric: { select: { id: true, name: true, projectId: true } } },
  });
  const { metric } = session;
  const loaded = await loadScoringMetric(metric.id);
  const current = withDraft(loaded, draft);
  const reviews = await loadSessionReviews(sessionId, metric.id);
  const cache: ConversationCache = new Map();
  await context.setStep(`Improving ${metric.name}: scoring the current version...`);
  const baseline = await scoreAll(metric.projectId, current, reviews, cache);
  const baselineMatched = matchedCount(baseline);
  let best: Attempt | null = null;
  let rows = optimizerRows(reviews, baseline);
  for (let iteration = 1; iteration <= OPTIMIZER_ITERATION_BUDGET; iteration += 1) {
    const proposal = await proposeMetric({
      metric: current,
      rows,
      iteration,
      budget: OPTIMIZER_ITERATION_BUDGET,
    });
    const outcomes = await scoreAll(
      metric.projectId,
      applyDraft(current, proposal),
      reviews,
      cache,
    );
    best = betterAttempt(best, {
      proposal,
      outcomes,
      matched: matchedCount(outcomes),
    });
    await context.setStep(
      `Improving ${metric.name}: iteration ${iteration} of ${OPTIMIZER_ITERATION_BUDGET}, ${best.matched}/${reviews.length} rows match.`,
    );
    if (best.matched === reviews.length) break;
    rows = optimizerRows(reviews, outcomes);
  }
  if (!best) throw new Error('The optimiser made no proposal.');
  await saveAttempt(sessionId, baselineMatched, reviews.length, best);
  await context.setResult({
    summary: `${metric.name}: Optimization completed. Lab accuracy ${baselineMatched}/${reviews.length} before, ${best.matched}/${reviews.length} after.`,
    deepLink: UrlGenerator.labEdit({ metricId: metric.id }),
    metricId: metric.id,
    sessionId,
  });
};

export const runOptimization = async (args: RunOptimizationArgs) => {
  try {
    await optimize(args);
  } catch (error) {
    await markFailed(args.sessionId);
    throw error;
  }
};
