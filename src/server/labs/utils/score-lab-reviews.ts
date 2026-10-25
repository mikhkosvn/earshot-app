import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import type { LabRowOutcome } from '@/server/labs/types';
import {
  expectedValueOf,
  scoringConversationIdOf,
} from '@/server/labs/utils/lab-row-view';
import { valuesMatch } from '@/server/labs/utils/values-match';
import { loadConversation } from '@/server/metric-scoring/context/load-conversation';
import { scoreMetric } from '@/server/metric-scoring/score-metric';
import type {
  ScoreOutcome,
  ScoringConversation,
  ScoringMetric,
} from '@/server/metric-scoring/types';

const scoringReviewSelect = {
  id: true,
  expectedNumber: true,
  expectedBoolean: true,
  expectedText: true,
  testSet: {
    select: {
      conversation: {
        select: { id: true, copiedFrom: { select: { id: true } } },
      },
    },
  },
} satisfies Prisma.LabReviewSelect;

export const loadScoringReviews = (metricId: number, reviewIds?: number[]) =>
  prisma.labReview.findMany({
    where: {
      metricId,
      ...(reviewIds && { id: { in: reviewIds } }),
    },
    orderBy: { id: Prisma.SortOrder.asc },
    select: scoringReviewSelect,
  });

type ScoringReview = Awaited<ReturnType<typeof loadScoringReviews>>[number];

const explanationOf = (outcome: ScoreOutcome) => {
  if (outcome.errorMessage) {
    return [...outcome.explanation, outcome.errorMessage];
  }
  return outcome.explanation;
};

export type ConversationCache = Map<number, ScoringConversation>;

const conversationFor = async (
  projectId: number,
  review: ScoringReview,
  cache: ConversationCache,
) => {
  const conversationId = scoringConversationIdOf(review.testSet.conversation);
  const cached = cache.get(conversationId);
  if (cached) return cached;
  const conversation = await loadConversation(projectId, conversationId);
  cache.set(conversationId, conversation);
  return conversation;
};

export const scoreLabReview = async (
  projectId: number,
  metric: ScoringMetric,
  review: ScoringReview,
  cache: ConversationCache,
): Promise<LabRowOutcome> => {
  const conversation = await conversationFor(projectId, review, cache);
  const outcome = await scoreMetric({ conversation, metric, dependencies: [] });
  return {
    reviewId: review.id,
    value: outcome.value,
    explanation: explanationOf(outcome),
    matched: valuesMatch(expectedValueOf(review), outcome.value),
  };
};
