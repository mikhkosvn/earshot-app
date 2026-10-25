import 'server-only';

import { EvaluationTrigger, TriggerType } from '@/generated/prisma/enums';
import {
  coerceValue,
  explanationLines,
} from '@/server/metric-scoring/code/coerce-value';
import { runPython } from '@/server/metric-scoring/code/run-python';
import { judgeRequestHandler } from '@/server/metric-scoring/code/score-custom-code';
import {
  judgeTemplateData,
  pythonData,
} from '@/server/metric-scoring/context/template-data';
import { askRelevance } from '@/server/metric-scoring/judge/ask-judge';
import { keywordOverlap } from '@/server/metric-scoring/judge/judge-mock';
import type { ScoringContext } from '@/server/metric-scoring/types';
import { renderTemplate } from '@/server/metric-scoring/utils/render-template';
import { stableRandom } from '@/server/metric-scoring/utils/stable-random';
import { MetricEvalType } from '@/generated/prisma/enums';

export type TriggerDecision = {
  runs: boolean;
  explanation: string[];
};

const RELEVANT_SHARE = 0.8;

const codeTrigger = async (
  context: ScoringContext,
): Promise<TriggerDecision> => {
  const run = await runPython({
    code: context.metric.evaluationTriggerCustomCode ?? '',
    data: pythonData(context.conversation, context.dependencies),
    onJudgeRequest: judgeRequestHandler(context.conversation, context.metric),
  });
  if (!run.ok) {
    throw new Error(run.error ?? 'The trigger code failed.');
  }
  return {
    runs: coerceValue(MetricEvalType.binary, run.result) === true,
    explanation: explanationLines(run.explanation),
  };
};

const judgeTrigger = async (
  context: ScoringContext,
): Promise<TriggerDecision> => {
  const { conversation, metric, dependencies } = context;
  const data = judgeTemplateData(conversation, dependencies);
  const rendered = renderTemplate(metric.evaluationTriggerPrompt ?? '', data);
  const decision = await askRelevance({
    prompt: `Trigger:\n${rendered.text}\n\nTranscript Json:\n${JSON.stringify(data.transcript_json)}\nCall End Reason: ${String(data.call_end_reason)}`,
    mock: () => ({
      isRelevant:
        keywordOverlap(conversation, rendered.text) > 0 ||
        stableRandom(metric.id, conversation.id) < RELEVANT_SHARE,
      explanation: [
        'The trigger condition was checked against the transcript.',
      ],
    }),
  });
  return { runs: decision.isRelevant, explanation: decision.explanation };
};

export const evaluateTrigger = (
  context: ScoringContext,
): Promise<TriggerDecision> => {
  if (context.metric.evaluationTrigger !== EvaluationTrigger.custom) {
    return Promise.resolve({ runs: true, explanation: [] });
  }
  if (context.metric.triggerType === TriggerType.custom_code) {
    return codeTrigger(context);
  }
  return judgeTrigger(context);
};
