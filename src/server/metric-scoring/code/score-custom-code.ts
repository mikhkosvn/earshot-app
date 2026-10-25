import 'server-only';

import { MetricEvalType } from '@/generated/prisma/enums';
import {
  coerceValue,
  explanationLines,
} from '@/server/metric-scoring/code/coerce-value';
import {
  type JudgeRequest,
  runPython,
} from '@/server/metric-scoring/code/run-python';
import { pythonData } from '@/server/metric-scoring/context/template-data';
import { askJudge } from '@/server/metric-scoring/judge/ask-judge';
import { judgeMock } from '@/server/metric-scoring/judge/judge-mock';
import type {
  ScoringContext,
  ScoringConversation,
  ScoringMetric,
} from '@/server/metric-scoring/types';
import {
  completed,
  failed,
  skipped,
} from '@/server/metric-scoring/utils/outcome';

const EVAL_TYPES: string[] = Object.values(MetricEvalType);

const isEvalType = (value: string): value is MetricEvalType =>
  EVAL_TYPES.includes(value);

const requestEvalType = (request: JudgeRequest, fallback: MetricEvalType) => {
  if (isEvalType(request.eval_type)) {
    return request.eval_type;
  }
  return fallback;
};

export const judgeRequestHandler =
  (conversation: ScoringConversation, metric: ScoringMetric) =>
  async (request: JudgeRequest) => {
    const judgeMetric: ScoringMetric = {
      ...metric,
      description: request.description,
      evalType: requestEvalType(request, metric.evalType),
    };
    const result = await askJudge({
      metric: judgeMetric,
      prompt: `Metric:\n${request.description}\n\nTranscript Json:\n${JSON.stringify(pythonData(conversation, []).transcript_json)}`,
      mock: () => judgeMock(conversation, judgeMetric, request.description),
    });
    return {
      result: result.result,
      explanation: result.explanation,
    };
  };

export const scoreCustomCode = async ({
  conversation,
  metric,
  dependencies,
}: ScoringContext) => {
  if (!metric.customCode?.trim())
    return failed('The metric has no Python code.');
  const run = await runPython({
    code: metric.customCode,
    data: pythonData(conversation, dependencies),
    onJudgeRequest: judgeRequestHandler(conversation, metric),
  });
  if (!run.ok) return failed(run.error ?? 'The Python code failed.');
  const value = coerceValue(metric.evalType, run.result);
  const explanation = explanationLines(run.explanation);
  if (value === null) return skipped(explanation);
  return completed(value, explanation);
};
