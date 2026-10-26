import 'server-only';

import { ChatRole, JobKind } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import {
  ASSISTANT_THINKING_STEP,
  SESSION_TITLE_LENGTH,
} from '@/server/evaluator-generation/constants';
import { startEvaluatorAssistantSchema } from '@/server/evaluator-generation/schemas';
import type { StartedAssistant } from '@/server/evaluator-generation/types';
import { runAssistantJob } from '@/server/evaluator-generation/utils/run-assistant-job';
import { appendSessionMessage } from '@/server/evaluator-generation/utils/session-records';
import { assertEvaluatorReferences } from '@/server/evaluators/utils/resolve-evaluator-references';
import { findFolderOrThrow } from '@/server/folders/utils/find-folder';
import { startJob } from '@/server/jobs/start-job';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

const firstMessage = (extraInstructions: string, numScenarios: number) => {
  if (extraInstructions) return extraInstructions;
  if (numScenarios === 1) return 'Generate one scenario for this agent.';
  return `Generate ${numScenarios} scenarios for this agent.`;
};

const sessionTitle = (message: string) => {
  if (message.length <= SESSION_TITLE_LENGTH) return message;
  return `${message.slice(0, SESSION_TITLE_LENGTH)}...`;
};

export const startEvaluatorAssistant = withValidation(
  startEvaluatorAssistantSchema,
  async ({ projectId, ...options }): Promise<StartedAssistant> => {
    const { user } = await requireProjectAccess(projectId);
    const message = firstMessage(
      options.extraInstructions,
      options.numScenarios,
    );
    const session = await prisma.$transaction(async (tx) => {
      await assertEvaluatorReferences(tx, {
        projectId,
        agentId: options.agentId,
        testProfileId: options.testProfileId,
        phoneNumberId: options.phoneNumberId,
      });
      for (const personalityId of options.personalityIds) {
        await assertEvaluatorReferences(tx, {
          projectId,
          agentId: null,
          personalityId,
        });
      }
      await findFolderOrThrow(tx, projectId, options.folderPath);
      const created = await tx.evaluatorGenerationSession.create({
        data: {
          projectId,
          agentId: options.agentId,
          title: sessionTitle(message),
          options,
          createdById: user.id,
        },
        select: { id: true },
      });
      await appendSessionMessage(tx, created.id, ChatRole.user, message);
      return created;
    });
    const { jobId } = await startJob({
      projectId,
      userId: user.id,
      kind: JobKind.evaluator_assistant,
      input: { sessionId: session.id },
      initialStep: ASSISTANT_THINKING_STEP,
      run: runAssistantJob,
    });
    addEventFields({
      generation_session: { id: session.id },
      agent: { id: options.agentId },
      job: { id: jobId },
      generation: {
        num_scenarios: options.numScenarios,
        scenario_type: options.scenarioType,
      },
    });
    return { jobId, sessionId: session.id };
  },
);
