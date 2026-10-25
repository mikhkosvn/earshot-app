import type { EvaluatorFormValues } from '@/app/(app)/test-case/_schemas/evaluator-form-schema';
import type { EvaluatorDetail } from '@/server/evaluators/types';

export const detailToFormValues = (
  detail: EvaluatorDetail,
): EvaluatorFormValues => ({
  agentId: detail.agentId,
  name: detail.name,
  folderPath: detail.folderPath ?? '',
  tags: detail.tags,
  scenarioType: detail.scenarioType,
  testProfileId: detail.testProfileId,
  firstMessage: detail.firstMessage,
  instructions: detail.instructions,
  personalityId: detail.personalityId,
  language: detail.language,
  expectedOutcomePrompt: detail.expectedOutcomePrompt,
  metricIds: detail.metricIds,
  expectedToolCalls: detail.expectedToolCalls.map((call) => ({
    mockToolId: call.mockToolId,
    input: call.input,
    output: call.output,
  })),
  phoneNumberId: detail.phoneNumberId,
  tools: detail.tools,
  maxDurationSeconds: detail.maxDurationSeconds,
});
