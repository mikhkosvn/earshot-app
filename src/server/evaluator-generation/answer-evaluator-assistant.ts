import 'server-only';

import { ChatRole, JobKind, JobStatus } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { requireUser } from '@/server/auth';
import { ActionError, withValidation } from '@/server/common/run-action';
import {
  ASSISTANT_THINKING_STEP,
  SKIPPED_ANSWER,
} from '@/server/evaluator-generation/constants';
import { answerEvaluatorAssistantSchema } from '@/server/evaluator-generation/schemas';
import type { StartedAssistant } from '@/server/evaluator-generation/types';
import { runAssistantJob } from '@/server/evaluator-generation/utils/run-assistant-job';
import {
  appendSessionMessage,
  latestSessionJob,
  sessionAccessWhere,
} from '@/server/evaluator-generation/utils/session-records';
import { startJob } from '@/server/jobs/start-job';

const answerText = (answer: string, skipped: boolean) => {
  if (skipped) return SKIPPED_ANSWER;
  return answer;
};

export const answerEvaluatorAssistant = withValidation(
  answerEvaluatorAssistantSchema,
  async ({ sessionId, answer, skipped }): Promise<StartedAssistant> => {
    const { user } = await requireUser();
    const session = await prisma.evaluatorGenerationSession.findUniqueOrThrow({
      where: { id: sessionId, ...sessionAccessWhere(user.id) },
      select: { id: true, projectId: true },
    });
    const [assistantJob, generationJob] = await Promise.all([
      latestSessionJob(
        session.projectId,
        session.id,
        JobKind.evaluator_assistant,
      ),
      latestSessionJob(
        session.projectId,
        session.id,
        JobKind.evaluator_generation,
      ),
    ]);
    if (generationJob || assistantJob?.status !== JobStatus.completed) {
      throw new ActionError('The assistant does not wait for an answer now.');
    }
    await appendSessionMessage(
      prisma,
      session.id,
      ChatRole.user,
      answerText(answer, skipped),
    );
    const { jobId } = await startJob({
      projectId: session.projectId,
      userId: user.id,
      kind: JobKind.evaluator_assistant,
      input: { sessionId: session.id },
      initialStep: ASSISTANT_THINKING_STEP,
      run: runAssistantJob,
    });
    return { jobId, sessionId: session.id };
  },
);
