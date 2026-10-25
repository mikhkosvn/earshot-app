import 'server-only';

import { generateObject } from '@/server/ai/generate-object';
import {
  ANALYSIS_MAX_TOKENS,
  ANALYST_SYSTEM_PROMPT,
  MAX_FAILURE_REASONS,
} from '@/server/result-analysis/constants';
import { mockFailureReasons } from '@/server/result-analysis/mocks/failure-steps-mock';
import { failureReasonsSchema } from '@/server/result-analysis/schemas';
import type {
  AnalysisInput,
  FailureReasonDraft,
} from '@/server/result-analysis/types';
import {
  formatAgent,
  formatRuns,
} from '@/server/result-analysis/utils/format-prompt';

export const generateFailureReasons = async (
  input: AnalysisInput,
): Promise<FailureReasonDraft[]> => {
  const failed = input.runs.filter((run) => run.failed);
  const failedIds = new Set(failed.map((run) => run.id));
  const output = await generateObject({
    system: ANALYST_SYSTEM_PROMPT,
    prompt: [
      formatAgent(input),
      `Group the failed calls by their cause. Return at most ${MAX_FAILURE_REASONS} issues, the most common first.`,
      'Each issue has a one-sentence description and the run IDs of the calls with that cause.',
      'Failed calls:',
      formatRuns(failed),
    ].join('\n\n'),
    schema: failureReasonsSchema,
    maxTokens: ANALYSIS_MAX_TOKENS,
    mock: () => ({ issues: mockFailureReasons(input.runs) }),
  });
  return output.issues
    .map((issue) => ({
      description: issue.description.trim(),
      runIds: [...new Set(issue.runIds)].filter((id) => failedIds.has(id)),
    }))
    .filter((issue) => issue.description && issue.runIds.length > 0);
};
