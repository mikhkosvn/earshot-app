import 'server-only';

import { MetricType } from '@/generated/prisma/enums';
import { recordStepFailure } from '@/server/common/logging/event-fields';
import { scoreCustomCode } from '@/server/metric-scoring/code/score-custom-code';
import {
  MetricScoringStep,
  NOT_SCORED_INPUT,
} from '@/server/metric-scoring/constants';
import { scoreLlmJudge } from '@/server/metric-scoring/judge/score-llm-judge';
import {
  hasPredefinedScorer,
  runPredefined,
} from '@/server/metric-scoring/predefined/run-predefined';
import { evaluateTrigger } from '@/server/metric-scoring/trigger/evaluate-trigger';
import type {
  ScoreOutcome,
  ScoringContext,
} from '@/server/metric-scoring/types';
import { failed, skipped } from '@/server/metric-scoring/utils/outcome';

const errorText = (error: unknown) => {
  if (error instanceof Error && error.message) return error.message;
  return 'The metric failed.';
};

const hasMissingInput = ({ metric, dependencies }: ScoringContext) =>
  metric.dependencyIds.some((dependencyId) => {
    const dependency = dependencies.find((item) => item.id === dependencyId);
    return !dependency || dependency.value === null;
  });

const scoreBody = (context: ScoringContext): Promise<ScoreOutcome> => {
  const { metric } = context;
  if (metric.functionName && hasPredefinedScorer(metric.functionName)) {
    return runPredefined(metric.functionName, context);
  }
  if (metric.type === MetricType.custom_code) return scoreCustomCode(context);
  return scoreLlmJudge(context);
};

export const scoreMetric = async (
  context: ScoringContext,
): Promise<ScoreOutcome> => {
  try {
    if (hasMissingInput(context)) return skipped([NOT_SCORED_INPUT]);
    const trigger = await evaluateTrigger(context);
    if (!trigger.runs) {
      return skipped([
        'The evaluation trigger did not match this conversation.',
        ...trigger.explanation,
      ]);
    }
    return await scoreBody(context);
  } catch (error) {
    recordStepFailure(MetricScoringStep.score_metric, error);
    return failed(errorText(error));
  }
};
