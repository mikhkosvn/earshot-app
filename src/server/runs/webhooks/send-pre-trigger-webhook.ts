import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { WebhookNotification } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { WebhookEvent } from '@/server/project-webhooks/constants/webhook-event';
import { sendProjectWebhook } from '@/server/project-webhooks/send-project-webhook';
import { readSnapshotName } from '@/server/runs/utils/evaluator-snapshot';
import { readTestProfileVariables } from '@/server/runs/utils/test-profile-snapshot';

const testProfileOf = (
  testProfile: { id: number; name: string } | null,
  snapshot: Prisma.JsonValue | null,
) => {
  if (!testProfile) return null;
  const variables = readTestProfileVariables(snapshot);
  return {
    id: testProfile.id,
    name: testProfile.name,
    information: {
      main_agent_variables: variables.mainAgentVariables,
      testing_agent_variables: variables.testingAgentVariables,
    },
  };
};

const personalityOf = (personality: { id: number; name: string } | null) => {
  if (!personality) return null;
  return { id: personality.id, name: personality.name };
};

export const sendPreTriggerWebhook = async (resultId: number) => {
  const result = await prisma.result.findUniqueOrThrow({
    where: { id: resultId },
    select: {
      id: true,
      projectId: true,
      name: true,
      agentId: true,
      agentNumber: true,
      runs: {
        orderBy: { id: Prisma.SortOrder.asc },
        select: {
          id: true,
          evaluatorId: true,
          evaluatorSnapshot: true,
          callerNumber: true,
          testProfileSnapshot: true,
          testProfile: { select: { id: true, name: true } },
          personality: { select: { id: true, name: true } },
        },
      },
    },
  });
  return sendProjectWebhook({
    projectId: result.projectId,
    event: WebhookEvent.resultPreTrigger,
    notification: WebhookNotification.result_pre_trigger,
    idempotencyKey: `${WebhookNotification.result_pre_trigger}:${result.id}`,
    payload: {
      result_id: result.id,
      label: result.name,
      agent_id: String(result.agentId ?? ''),
      timestamp: new Date().toISOString(),
      runs: Object.fromEntries(
        result.runs.map((run) => [
          run.id,
          {
            id: run.id,
            scenario: {
              id: run.evaluatorId,
              name: readSnapshotName(run.evaluatorSnapshot),
            },
            test_profile: testProfileOf(
              run.testProfile,
              run.testProfileSnapshot,
            ),
            personality: personalityOf(run.personality),
            phone_number: run.callerNumber,
            outbound_phone_number: result.agentNumber,
          },
        ]),
      ),
    },
  });
};
