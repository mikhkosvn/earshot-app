import 'server-only';

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

type ScoredEvaluation = {
  metricId: number;
  valueNumber: number | null;
  valueBoolean: boolean | null;
  valueText: string | null;
  explanation: string[];
  evaluatedAt: Date | null;
};

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
  const copy = await copyConversation(projectId, conversationId);
  const correctionOf = new Map(
    corrections.map((correction) => [correction.metricId, correction]),
  );
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
