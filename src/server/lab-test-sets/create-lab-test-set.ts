import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { createLabTestSetSchema } from '@/server/lab-test-sets/schemas';
import type {
  CreateLabTestSetInput,
  LabCorrection,
  LabTestSetSummary,
} from '@/server/lab-test-sets/types';
import { copyConversation } from '@/server/lab-test-sets/utils/copy-conversation';
import {
  valueFromParts,
  valueParts,
} from '@/server/metric-scoring/utils/value-parts';
import type { MetricValue } from '@/server/metrics/types';

interface ScoredEvaluation {
  metricId: number;
  valueNumber: number | null;
  valueBoolean: boolean | null;
  valueText: string | null;
  explanation: string[];
  evaluatedAt: Date | null;
}

const expectedOf = (
  evaluation: ScoredEvaluation,
  correction: LabCorrection | undefined,
): MetricValue => {
  if (correction) return correction.expectedValue;
  return valueFromParts({
    number: evaluation.valueNumber,
    boolean: evaluation.valueBoolean,
    text: evaluation.valueText,
  });
};

const reviewData = (
  evaluation: ScoredEvaluation,
  correction: LabCorrection | undefined,
) => {
  const expected = valueParts(expectedOf(evaluation, correction));
  return {
    metricId: evaluation.metricId,
    expectedNumber: expected.number,
    expectedBoolean: expected.boolean,
    expectedText: expected.text,
    actualNumber: evaluation.valueNumber,
    actualBoolean: evaluation.valueBoolean,
    actualText: evaluation.valueText,
    actualExplanation: evaluation.explanation,
    actualEvaluatedAt: evaluation.evaluatedAt,
    feedback: correction?.feedback ?? null,
  };
};

interface SourceTestSet {
  id: number;
  conversationId: number;
}

const findSourceTestSet = (projectId: number, conversationId: number) =>
  prisma.labTestSet.findFirst({
    where: {
      conversation: {
        projectId,
        OR: [{ id: conversationId }, { copiedFromId: conversationId }],
      },
    },
    orderBy: { id: Prisma.SortOrder.asc },
    select: { id: true, conversationId: true },
  });

const correctionUpdate = (
  correction: LabCorrection | undefined,
  expected: ReturnType<typeof valueParts>,
) => {
  if (!correction) return {};
  return {
    expectedNumber: expected.number,
    expectedBoolean: expected.boolean,
    expectedText: expected.text,
    feedback: correction.feedback || null,
  };
};

const extendTestSet = async (
  testSet: SourceTestSet,
  evaluations: ScoredEvaluation[],
  correctionOf: Map<number, LabCorrection>,
): Promise<LabTestSetSummary> => {
  for (const evaluation of evaluations) {
    const correction = correctionOf.get(evaluation.metricId);
    const data = reviewData(evaluation, correction);
    const expected = valueParts(expectedOf(evaluation, correction));
    await prisma.labReview.upsert({
      where: {
        testSetId_metricId: {
          testSetId: testSet.id,
          metricId: evaluation.metricId,
        },
      },
      create: { testSetId: testSet.id, ...data },
      update: correctionUpdate(correction, expected),
    });
  }
  const reviewCount = await prisma.labReview.count({
    where: { testSetId: testSet.id },
  });
  return {
    id: testSet.id,
    conversationId: testSet.conversationId,
    reviewCount,
  };
};

export const createLabTestSet = async (
  input: CreateLabTestSetInput,
): Promise<LabTestSetSummary> => {
  const { projectId, conversationId, corrections } =
    createLabTestSetSchema.parse(input);
  const evaluations = await prisma.metricEvaluation.findMany({
    where: { conversationId, conversation: { projectId } },
    select: {
      metricId: true,
      valueNumber: true,
      valueBoolean: true,
      valueText: true,
      explanation: true,
      evaluatedAt: true,
    },
  });
  const correctionOf = new Map(
    corrections.map((correction) => [correction.metricId, correction]),
  );
  const existing = await findSourceTestSet(projectId, conversationId);
  if (existing) {
    return extendTestSet(existing, evaluations, correctionOf);
  }
  const copy = await copyConversation(projectId, conversationId);
  const testSet = await prisma.labTestSet.create({
    data: {
      conversationId: copy.id,
      reviews: {
        create: evaluations.map((evaluation) =>
          reviewData(evaluation, correctionOf.get(evaluation.metricId)),
        ),
      },
    },
    select: {
      id: true,
      conversationId: true,
      _count: { select: { reviews: true } },
    },
  });
  return {
    id: testSet.id,
    conversationId: testSet.conversationId,
    reviewCount: testSet._count.reviews,
  };
};
