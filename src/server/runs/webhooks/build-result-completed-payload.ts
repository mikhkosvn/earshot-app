import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { UrlGenerator } from '@/lib/url-generator/url-generator';
import { TRANSCRIPT_ROLE_LABEL } from '@/server/call-engine/constants';
import { valueFromParts } from '@/server/metric-scoring/utils/value-parts';
import { readEvaluatorSnapshot } from '@/server/runs/utils/evaluator-snapshot';
import { countRuns, isSuccessfulRun } from '@/server/runs/utils/run-counts';
import { appUrl } from '@/server/runs/utils/app-url';

const SECONDS_PER_MINUTE = 60;

const payloadSelect = {
  id: true,
  name: true,
  agentId: true,
  status: true,
  createdAt: true,
  monitorRun: { select: { id: true } },
  runs: {
    orderBy: { id: Prisma.SortOrder.asc },
    select: {
      id: true,
      status: true,
      evaluationStatus: true,
      evaluatorId: true,
      evaluatorSnapshot: true,
      errorMessage: true,
      executedAt: true,
      createdAt: true,
      personality: { select: { name: true } },
      conversation: {
        select: {
          recordingFileId: true,
          turns: {
            orderBy: { position: Prisma.SortOrder.asc },
            select: {
              role: true,
              content: true,
              startTime: true,
              endTime: true,
            },
          },
          metricEvaluations: {
            orderBy: { metricId: Prisma.SortOrder.asc },
            select: {
              metricId: true,
              valueNumber: true,
              valueBoolean: true,
              valueText: true,
              explanation: true,
              metric: { select: { name: true, evalType: true } },
            },
          },
        },
      },
    },
  },
} satisfies Prisma.ResultSelect;

type PayloadResult = Prisma.ResultGetPayload<{ select: typeof payloadSelect }>;
type PayloadRun = PayloadResult['runs'][number];

const clockOf = (seconds: number | null) => {
  const total = Math.max(0, Math.floor(seconds ?? 0));
  const minutes = Math.floor(total / SECONDS_PER_MINUTE);
  const rest = total % SECONDS_PER_MINUTE;
  return `${String(minutes).padStart(2, '0')}:${String(rest).padStart(2, '0')}`;
};

const recordingUrlOf = (fileId: string | null) => {
  if (!fileId) return null;
  return appUrl(UrlGenerator.file({ fileId }));
};

const runPayload = (run: PayloadRun) => {
  const snapshot = readEvaluatorSnapshot(run.evaluatorSnapshot);
  return {
    id: run.id,
    status: run.status,
    evaluation_status: run.evaluationStatus,
    scenario: {
      id: run.evaluatorId,
      name: snapshot.name,
      personality_name: run.personality?.name ?? null,
      expected_outcome_prompt: snapshot.expectedOutcomePrompt ?? '',
    },
    success: isSuccessfulRun(run),
    evaluation: {
      metrics: run.conversation.metricEvaluations.map((evaluation) => ({
        id: evaluation.metricId,
        name: evaluation.metric.name,
        eval_type: evaluation.metric.evalType,
        score: valueFromParts({
          number: evaluation.valueNumber,
          boolean: evaluation.valueBoolean,
          text: evaluation.valueText,
        }),
        explanation: evaluation.explanation,
      })),
    },
    transcript_object: run.conversation.turns.map((turn) => ({
      role: TRANSCRIPT_ROLE_LABEL[turn.role],
      time: clockOf(turn.startTime),
      content: turn.content,
      start_time: turn.startTime,
      end_time: turn.endTime,
    })),
    voice_recording: recordingUrlOf(run.conversation.recordingFileId),
    timestamp: run.createdAt.toISOString(),
    executed_at: run.executedAt?.toISOString() ?? null,
    error_message: run.errorMessage ?? '',
  };
};

const successRate = (success: number, total: number) => {
  if (total === 0) return 0;
  return Math.round((success / total) * 10000) / 100;
};

export const buildResultCompletedPayload = async (resultId: number) => {
  const result = await prisma.result.findUniqueOrThrow({
    where: { id: resultId },
    select: payloadSelect,
  });
  const counts = countRuns(result.runs);
  return {
    result,
    counts,
    payload: {
      id: result.id,
      name: result.name,
      agent: result.agentId,
      status: result.status,
      met_expected_outcome_count: counts.success,
      total_expected_outcome_count: counts.total,
      success_rate: successRate(counts.success, counts.total),
      run_as_text: false,
      is_cronjob: result.monitorRun !== null,
      created_at: result.createdAt.toISOString(),
      runs: Object.fromEntries(
        result.runs.map((run) => [run.id, runPayload(run)]),
      ),
    },
  };
};
