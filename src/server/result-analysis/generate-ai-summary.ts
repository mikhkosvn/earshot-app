import 'server-only';

import { generateObject } from '@/server/ai/generate-object';
import {
  ANALYSIS_MAX_TOKENS,
  ANALYST_SYSTEM_PROMPT,
} from '@/server/result-analysis/constants';
import { mockAiSummary } from '@/server/result-analysis/mocks/summary-mock';
import { aiSummarySchema } from '@/server/result-analysis/schemas';
import type { AnalysisInput } from '@/server/result-analysis/types';
import {
  formatAgent,
  formatRuns,
} from '@/server/result-analysis/utils/format-prompt';

export const generateAiSummary = (input: AnalysisInput) =>
  generateObject({
    system: ANALYST_SYSTEM_PROMPT,
    prompt: [
      formatAgent(input),
      `The result has ${input.runs.length} calls. ${input.runs.filter((run) => run.failed).length} failed.`,
      'Explain the failures in three parts:',
      '- whatHappened: what went wrong, in 1 or 2 sentences.',
      '- whyItHappened: the most likely cause, in 1 or 2 sentences.',
      '- howToFix: the change to make to the agent, in 1 or 2 sentences.',
      'Failed calls:',
      formatRuns(input.runs.filter((run) => run.failed)),
    ].join('\n\n'),
    schema: aiSummarySchema,
    maxTokens: ANALYSIS_MAX_TOKENS,
    mock: () => mockAiSummary(input),
  });
