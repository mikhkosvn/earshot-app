import 'server-only';

import { generateObject } from '@/server/ai/generate-object';
import {
  ANALYSIS_MAX_TOKENS,
  ANALYST_SYSTEM_PROMPT,
  MAX_NEXT_STEPS,
} from '@/server/result-analysis/constants';
import { mockNextSteps } from '@/server/result-analysis/mocks/failure-steps-mock';
import { nextStepsSchema } from '@/server/result-analysis/schemas';
import type {
  AnalysisInput,
  NextStepDraft,
} from '@/server/result-analysis/types';
import {
  formatAgent,
  formatRuns,
} from '@/server/result-analysis/utils/format-prompt';

export const generateNextSteps = async (
  input: AnalysisInput,
): Promise<NextStepDraft[]> => {
  const output = await generateObject({
    system: ANALYST_SYSTEM_PROMPT,
    prompt: [
      formatAgent(input),
      `Write at most ${MAX_NEXT_STEPS} next steps that fix the failures below.`,
      'Each step has a short title (5 words or fewer) and a one-sentence description that starts with a verb.',
      'Failed calls:',
      formatRuns(input.runs.filter((run) => run.failed)),
    ].join('\n\n'),
    schema: nextStepsSchema,
    maxTokens: ANALYSIS_MAX_TOKENS,
    mock: () => ({ steps: mockNextSteps(input.runs) }),
  });
  return output.steps
    .map((step) => ({
      title: step.title.trim(),
      description: step.description.trim(),
    }))
    .filter((step) => step.title && step.description);
};
