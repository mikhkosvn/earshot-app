import 'server-only';

import { MetricEvalType } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { generateObject } from '@/server/ai/generate-object';
import { withValidation } from '@/server/common/run-action';
import { MetricFormType } from '@/server/metrics/constants/definition/metric-form-type';
import {
  improvedMetricSchema,
  improveMetricSchema,
} from '@/server/metrics/schemas';
import type { ImprovedMetric } from '@/server/metrics/types';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

const SYSTEM_PROMPT = [
  'You improve evaluation metrics for voice AI agents.',
  'The agent under test is the "Main Agent". The simulated caller is the "Testing Agent".',
  'For an LLM judge metric, rewrite the description with explicit success and failure criteria.',
  'For a Python metric, return working Python that reads the global dict `data` and sets `_result` and `_explanation`.',
  'Keep the intent of the user. Do not add checks that the user did not ask for.',
].join('\n');

const judgeMock = (text: string, evalType: MetricEvalType): ImprovedMetric => ({
  refinedText: [
    text.trim(),
    'Success criteria (True):\n1. The Main Agent shows the expected behavior at the moment the situation arises.',
    'Failure criteria (False):\n1. The situation arises and the Main Agent does not show the expected behavior.',
    'Return N/A when the situation does not arise in the conversation. Reference the Main Agent and the Testing Agent by role.',
  ].join('\n\n'),
  evalType,
  summary:
    'The definition now names the roles and states explicit success, failure, and N/A rules.',
  resolvedEdgeCases: [
    'Situation not present: the judge returns N/A in place of a failure.',
  ],
});

const codeMock = (text: string, evalType: MetricEvalType): ImprovedMetric => ({
  refinedText: text,
  evalType,
  summary:
    'The code already reads `data` and sets `_result` and `_explanation`. No change is proposed.',
  resolvedEdgeCases: [],
});

const improvedMock = (
  type: MetricFormType,
  text: string,
  evalType: MetricEvalType,
) => {
  if (type === MetricFormType.custom_code) return codeMock(text, evalType);
  return judgeMock(text, evalType);
};

export const improveMetric = withValidation(
  improveMetricSchema,
  async ({ projectId, agentId, type, evalType, text }) => {
    await requireProjectAccess(projectId);
    const agent = await prisma.agent.findUniqueOrThrow({
      where: { id: agentId, projectId },
      select: { name: true, description: true },
    });
    return generateObject({
      system: SYSTEM_PROMPT,
      prompt: `Agent: ${agent.name}\nAgent description:\n${agent.description}\n\nMetric form: ${type}\nMetric type: ${evalType}\n\nCurrent definition:\n${text}`,
      schema: improvedMetricSchema,
      mock: () => improvedMock(type, text, evalType),
    });
  },
);
