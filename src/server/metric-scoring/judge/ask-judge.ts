import 'server-only';

import { z } from 'zod';

import { MetricEvalType } from '@/generated/prisma/enums';
import { generateObject } from '@/server/ai/generate-object';
import type { JudgeResult } from '@/server/metric-scoring/judge/judge-mock';
import type { ScoringMetric } from '@/server/metric-scoring/types';
import { RATING_SCALE_MAX } from '@/server/metrics/constants/definition/metric-limits';

const explanationSchema = z
  .array(z.string())
  .describe(
    'Concise explanatory points about the decision, each with timestamps in M:SS.cc format',
  );

const resultSchemaFor = (metric: ScoringMetric) => {
  if (metric.evalType === MetricEvalType.binary) return z.boolean().nullable();
  if (metric.evalType === MetricEvalType.continuous_qualitative) {
    return z.number().min(0).max(RATING_SCALE_MAX).nullable();
  }
  if (metric.evalType === MetricEvalType.enum && metric.enumValues.length > 0) {
    return z.enum(metric.enumValues).nullable();
  }
  if (metric.evalType === MetricEvalType.enum) return z.string().nullable();
  return z.number().nullable();
};

const SYSTEM_PROMPT = [
  'You are an LLM judge that scores one voice AI conversation against one metric.',
  'The agent under test is the "Main Agent". The simulated caller is the "Testing Agent".',
  'Return result null (N/A) when the conversation gives no chance to apply the metric.',
  'Cite the turns that decided the result with their timestamps.',
].join('\n');

const resultHint = (metric: ScoringMetric) => {
  if (metric.evalType === MetricEvalType.binary)
    return 'Result: true or false.';
  if (metric.evalType === MetricEvalType.continuous_qualitative) {
    return `Result: a rating from 0 to ${RATING_SCALE_MAX}.`;
  }
  if (metric.evalType === MetricEvalType.enum) {
    return `Result: one of ${JSON.stringify(metric.enumValues)}.`;
  }
  return 'Result: a number.';
};

interface AskJudgeArgs {
  metric: ScoringMetric;
  prompt: string;
  mock: () => JudgeResult;
}

export const askJudge = async ({
  metric,
  prompt,
  mock,
}: AskJudgeArgs): Promise<JudgeResult> => {
  const schema = z.object({
    result: resultSchemaFor(metric),
    explanation: explanationSchema,
  });
  return generateObject({
    system: SYSTEM_PROMPT,
    prompt: `${prompt}\n\n${resultHint(metric)}`,
    schema,
    mock,
  });
};

const relevanceSchema = z.object({
  isRelevant: z.boolean(),
  explanation: explanationSchema,
});

export type RelevanceResult = z.output<typeof relevanceSchema>;

export const askRelevance = (args: {
  prompt: string;
  mock: () => RelevanceResult;
}) =>
  generateObject({
    system: [
      'You decide if an evaluation metric applies to one voice AI conversation.',
      'Answer isRelevant true when the trigger condition holds in the conversation.',
    ].join('\n'),
    prompt: args.prompt,
    schema: relevanceSchema,
    mock: args.mock,
  });
