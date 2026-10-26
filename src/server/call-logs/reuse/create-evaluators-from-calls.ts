import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { JobKind } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { UrlGenerator } from '@/lib/url-generator/url-generator';
import { evaluatorsFromCallsSchema } from '@/server/call-logs/schemas';
import type { CallJobStarted } from '@/server/call-logs/types';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import { createEvaluatorFromTranscript } from '@/server/evaluators/ai/create-evaluator-from-transcript';
import { startJob } from '@/server/jobs/start-job';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

const progressText = (done: number, total: number) =>
  `${done}/${total} completed`;

const loadCalls = (projectId: number, callLogIds: number[]) =>
  prisma.callLog.findMany({
    where: { id: { in: callLogIds }, projectId, agentId: { not: null } },
    select: {
      id: true,
      agentId: true,
      conversation: {
        select: {
          turns: {
            orderBy: { position: Prisma.SortOrder.asc },
            select: { role: true, content: true, startTime: true },
          },
        },
      },
    },
  });

const deepLinkOf = (evaluatorIds: number[]) => {
  if (evaluatorIds.length !== 1) return UrlGenerator.evaluators();
  return UrlGenerator.evaluator({ evaluatorId: evaluatorIds[0] });
};

export const createEvaluatorsFromCalls = withValidation(
  evaluatorsFromCallsSchema,
  async ({ projectId, callLogIds, folderPath }): Promise<CallJobStarted> => {
    const { user } = await requireProjectAccess(projectId);
    const calls = await loadCalls(projectId, callLogIds);
    addEventFields({
      project: { id: projectId },
      call_logs: { requested: callLogIds.length, found: calls.length },
    });
    return startJob({
      projectId,
      userId: user.id,
      kind: JobKind.evaluator_generation,
      input: { callLogIds: calls.map((call) => call.id), folderPath },
      initialStep: progressText(0, calls.length),
      run: async ({ setStep, setResult }) => {
        const evaluatorIds: number[] = [];
        for (const call of calls) {
          const created = await createEvaluatorFromTranscript({
            projectId,
            agentId: call.agentId ?? 0,
            folderPath,
            name: '',
            turns: call.conversation.turns,
          });
          evaluatorIds.push(created.id);
          await setStep(progressText(evaluatorIds.length, calls.length));
        }
        addEventFields({ evaluators: { created: evaluatorIds.length } });
        await setResult({
          summary: progressText(evaluatorIds.length, calls.length),
          deepLink: deepLinkOf(evaluatorIds),
          evaluatorIds,
        });
      },
    });
  },
);
