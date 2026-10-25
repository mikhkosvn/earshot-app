import 'server-only';

import { z } from 'zod';

import { CreationMethod, ScenarioType } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { generateObject } from '@/server/ai/generate-object';
import { TRANSCRIPT_ROLE_LABEL } from '@/server/call-engine/constants';
import { addEventFields } from '@/server/common/logging/event-fields';
import { ActionError, withValidation } from '@/server/common/run-action';
import { transcriptEvaluatorMock } from '@/server/evaluators/ai/mocks/transcript-evaluator-mock';
import { DEFAULT_SCENARIO_TOOLS } from '@/server/evaluators/constants/scenario-tool-descriptions';
import { createEvaluatorFromTranscriptSchema } from '@/server/evaluators/schemas/evaluator-ai';
import { evaluatorFieldsSchema } from '@/server/evaluators/schemas/evaluator-fields';
import { getAgentEvaluatorDefaults } from '@/server/evaluators/utils/agent-evaluator-defaults';
import { recordEvaluatorVersion } from '@/server/evaluators/utils/record-evaluator-version';
import { createEvaluatorRecord } from '@/server/evaluators/utils/write-evaluator';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

const SYSTEM_PROMPT =
  'You turn a past call between a voice agent (Main Agent) and a caller (Testing Agent) into a test evaluator that replays the call. Write the caller instructions in the second person inside <scenario></scenario> tags. Write the expected outcome as concrete bullets about the Main Agent. Give a short name. The first message is the first caller sentence when the caller speaks first, else an empty string.';

const draftSchema = z.object({
  name: z.string(),
  firstMessage: z.string(),
  instructions: z.string(),
  expectedOutcomePrompt: z.string(),
});

export const createEvaluatorFromTranscript = withValidation(
  createEvaluatorFromTranscriptSchema,
  async ({ projectId, agentId, folderPath, name, turns }) => {
    const { user } = await requireProjectAccess(projectId);
    const transcript = turns
      .map((turn) => `${TRANSCRIPT_ROLE_LABEL[turn.role]}: ${turn.content}`)
      .join('\n');
    addEventFields({
      project: { id: projectId },
      agent: { id: agentId },
      transcript: { turn_count: turns.length },
    });
    const draft = await generateObject({
      system: SYSTEM_PROMPT,
      prompt: transcript,
      schema: draftSchema,
      mock: () => transcriptEvaluatorMock(turns),
    });
    return prisma.$transaction(async (tx) => {
      const defaults = await getAgentEvaluatorDefaults(tx, projectId, agentId);
      if (!defaults.personalityId) {
        throw new ActionError('Enable a personality for this project first.');
      }
      const fields = evaluatorFieldsSchema.parse({
        agentId,
        name: name || draft.name,
        folderPath,
        tags: [],
        scenarioType: ScenarioType.instruction,
        testProfileId: defaults.defaultTestProfileId,
        firstMessage: draft.firstMessage,
        instructions: draft.instructions,
        personalityId: defaults.personalityId,
        language: defaults.language,
        expectedOutcomePrompt: draft.expectedOutcomePrompt,
        metricIds: defaults.metricIds,
        expectedToolCalls: [],
        phoneNumberId: null,
        tools: DEFAULT_SCENARIO_TOOLS,
        maxDurationSeconds: null,
      });
      const created = await createEvaluatorRecord(tx, {
        projectId,
        userId: user.id,
        fields,
        creationMethod: CreationMethod.manual_with_generate,
      });
      addEventFields({
        evaluator: {
          id: created.id,
          creation_method: CreationMethod.manual_with_generate,
        },
      });
      await recordEvaluatorVersion(tx, {
        evaluatorId: created.id,
        userId: user.id,
        changeReason: 'Created from transcript',
      });
      return { id: created.id, folderPath };
    });
  },
);
