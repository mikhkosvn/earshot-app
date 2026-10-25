import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { RunStatus } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { TRANSCRIPT_ROLE_LABEL } from '@/server/call-engine/constants';
import { computeRubricVerdict } from '@/server/metric-scoring/compute-rubric-verdict';
import { valueFromParts } from '@/server/metric-scoring/utils/value-parts';
import type {
  AnalysisFailingCheck,
  AnalysisInput,
} from '@/server/result-analysis/types';
import { readEvaluatorSnapshot } from '@/server/runs/utils/evaluator-snapshot';
import { isFailedRun, isSuccessfulRun } from '@/server/runs/utils/run-counts';

const inputSelect = {
  id: true,
  agent: { select: { name: true, description: true } },
  runs: {
    where: { status: { not: RunStatus.cancelled } },
    orderBy: { id: Prisma.SortOrder.asc },
    select: {
      id: true,
      status: true,
      evaluationStatus: true,
      errorMessage: true,
      evaluatorSnapshot: true,
      conversationId: true,
      conversation: {
        select: {
          turns: {
            orderBy: { position: Prisma.SortOrder.asc },
            select: { role: true, content: true },
          },
          metricEvaluations: {
            orderBy: { metricId: Prisma.SortOrder.asc },
            select: {
              metricId: true,
              valueNumber: true,
              valueBoolean: true,
              valueText: true,
              normalizedScore: true,
              explanation: true,
              metric: { select: { name: true, evalType: true } },
            },
          },
        },
      },
    },
  },
} satisfies Prisma.ResultSelect;

type InputRun = Prisma.ResultGetPayload<{
  select: typeof inputSelect;
}>['runs'][number];

const transcriptOf = (run: InputRun) =>
  run.conversation.turns
    .map((turn) => `${TRANSCRIPT_ROLE_LABEL[turn.role]}: ${turn.content}`)
    .join('\n');

const failingChecksOf = async (
  run: InputRun,
): Promise<AnalysisFailingCheck[]> => {
  if (run.status !== RunStatus.completed) return [];
  const verdict = await computeRubricVerdict({
    conversationId: run.conversationId,
  });
  return verdict.items
    .filter((item) => !item.passed)
    .map((item) => ({
      metricName: item.metricName,
      explanation: item.explanation,
    }));
};

export const loadAnalysisInput = async (
  resultId: number,
): Promise<AnalysisInput> => {
  const result = await prisma.result.findUniqueOrThrow({
    where: { id: resultId },
    select: inputSelect,
  });
  const runs = [];
  for (const run of result.runs) {
    const snapshot = readEvaluatorSnapshot(run.evaluatorSnapshot);
    runs.push({
      id: run.id,
      evaluatorName: snapshot.name,
      instructions: snapshot.instructions,
      expectedOutcome: snapshot.expectedOutcomePrompt,
      status: run.status,
      evaluationStatus: run.evaluationStatus,
      errorMessage: run.errorMessage,
      success: isSuccessfulRun(run),
      failed: isFailedRun(run),
      transcript: transcriptOf(run),
      failingChecks: await failingChecksOf(run),
      metrics: run.conversation.metricEvaluations.map((evaluation) => ({
        metricId: evaluation.metricId,
        name: evaluation.metric.name,
        evalType: evaluation.metric.evalType,
        value: valueFromParts({
          number: evaluation.valueNumber,
          boolean: evaluation.valueBoolean,
          text: evaluation.valueText,
        }),
        normalizedScore: evaluation.normalizedScore,
        explanation: evaluation.explanation,
      })),
    });
  }
  return {
    resultId: result.id,
    agentName: result.agent?.name ?? '',
    agentDescription: result.agent?.description ?? '',
    runs,
  };
};
