import 'server-only';

import { generateText } from '@/server/ai/generate-text';
import { withValidation } from '@/server/common/run-action';
import {
  EvaluatorTextKind,
  EvaluatorTextKindLabel,
} from '@/server/evaluators/constants/evaluator-text-kind';
import { improveTextMock } from '@/server/evaluators/ai/mocks/improve-text-mock';
import { improveEvaluatorTextSchema } from '@/server/evaluators/schemas/evaluator-ai';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';
import { prisma } from '@/lib/prisma';

const SYSTEM_PROMPT: Record<EvaluatorTextKind, string> = {
  [EvaluatorTextKind.instructions]:
    'You improve the instructions of a simulated caller that tests a voice agent. Write in the second person ("You are ..."). Wrap the result in <scenario></scenario> tags. Keep every fact and every {{test_profile.*}} variable. Do not write exact turn-by-turn scripts. Return only the improved instructions.',
  [EvaluatorTextKind.expectedOutcome]:
    'You improve the expected outcome of a voice agent test. The AI agent is the "Main Agent" and the caller is the "Testing Agent". Write one concrete, checkable bullet per expectation. Keep every {{test_profile.*}} variable. Return only the improved expected outcome.',
};

const agentDescription = async (agentId: number | null, projectId: number) => {
  if (!agentId) return '';
  const agent = await prisma.agent.findFirst({
    where: { id: agentId, projectId },
    select: { description: true },
  });
  return agent?.description ?? '';
};

export const improveEvaluatorText = withValidation(
  improveEvaluatorTextSchema,
  async ({ projectId, agentId, kind, text }) => {
    await requireProjectAccess(projectId);
    const description = await agentDescription(agentId, projectId);
    const improved = await generateText({
      system: SYSTEM_PROMPT[kind],
      prompt: `Agent description:\n${description}\n\nCurrent ${EvaluatorTextKindLabel[kind]}:\n${text}`,
      mock: () => improveTextMock(kind, text),
    });
    return { text: improved.trim() };
  },
);
