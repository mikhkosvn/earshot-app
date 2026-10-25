import 'server-only';

import { generateObject } from '@/server/ai/generate-object';
import {
  ANALYSIS_MAX_TOKENS,
  ANALYST_SYSTEM_PROMPT,
  MAX_WORKFLOW_PATHS,
  MIN_WORKFLOW_PATHS,
} from '@/server/result-analysis/constants';
import { mockWorkflowCoverage } from '@/server/result-analysis/mocks/workflow-mock';
import { workflowCoverageSchema } from '@/server/result-analysis/schemas';
import type {
  AnalysisInput,
  WorkflowPathDraft,
} from '@/server/result-analysis/types';
import {
  formatAgent,
  formatRuns,
} from '@/server/result-analysis/utils/format-prompt';

export const generateWorkflowCoverage = async (
  input: AnalysisInput,
): Promise<WorkflowPathDraft[]> => {
  const output = await generateObject({
    system: ANALYST_SYSTEM_PROMPT,
    prompt: [
      formatAgent(input),
      `From the agent description, list the ${MIN_WORKFLOW_PATHS} to ${MAX_WORKFLOW_PATHS} main workflows that the agent handles.`,
      'Give each workflow a short label that starts with a verb, for example "Provide membership information".',
      'Set covered to true only if at least one passed call below went through that workflow.',
      'Calls:',
      formatRuns(input.runs.filter((run) => run.success)),
    ].join('\n\n'),
    schema: workflowCoverageSchema,
    maxTokens: ANALYSIS_MAX_TOKENS,
    mock: () => ({ paths: mockWorkflowCoverage(input) }),
  });
  return output.paths
    .map((path) => ({ label: path.label.trim(), covered: path.covered }))
    .filter((path) => path.label);
};
