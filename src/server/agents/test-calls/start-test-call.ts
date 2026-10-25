import 'server-only';

import {
  BackgroundNoise,
  Gender,
  InterruptionLevel,
  JobKind,
} from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { UrlGenerator } from '@/lib/url-generator/url-generator';
import {
  TEST_CALL_FIRST_MESSAGE,
  TEST_CALL_IN_PROGRESS_HEADLINE,
  TEST_CALL_MAX_DURATION_SECONDS,
  TestConnectionStatus,
} from '@/server/agents/constants/test-call';
import { agentIdSchema } from '@/server/agents/schemas';
import {
  finishedProgress,
  inCallProgress,
  queuedProgress,
} from '@/server/agents/test-calls/test-call-progress';
import type { StartedTestCall } from '@/server/agents/types';
import { checkConnections } from '@/server/agents/utils/check-connections';
import { requireAgentAccess } from '@/server/agents/utils/require-agent-access';
import { CallDirection } from '@/server/call-engine/constants';
import { getCallEngine } from '@/server/call-engine/get-call-engine';
import { ActionError, withValidation } from '@/server/common/run-action';
import { startJob } from '@/server/jobs/start-job';

const TEST_CALL_INSTRUCTIONS =
  'You call to check that the line works. Ask if the agent can hear you. When the agent replies, say okay and end the call.';

const directionOf = (inbound: boolean) => {
  if (inbound) return CallDirection.outbound;
  return CallDirection.inbound;
};

const summaryOf = (status: TestConnectionStatus) => {
  if (status === TestConnectionStatus.passed) return 'The test call passed.';
  return 'The test call did not pass.';
};

export const startTestCall = withValidation(
  agentIdSchema,
  async ({ agentId }): Promise<StartedTestCall> => {
    const { user } = await requireAgentAccess(agentId);
    const agent = await prisma.agent.findUniqueOrThrow({
      where: { id: agentId },
      select: {
        id: true,
        projectId: true,
        name: true,
        description: true,
        language: true,
        phoneNumber: true,
        inbound: true,
        provider: true,
        providerAgentId: true,
        providerApiKeyEncrypted: true,
      },
    });
    const check = checkConnections({
      provider: agent.provider,
      phoneNumber: agent.phoneNumber,
      providerAgentId: agent.providerAgentId,
      apiKeyConfigured: Boolean(agent.providerApiKeyEncrypted),
    });
    const connection = check.connections.find((item) => item.testable);
    if (!connection) {
      throw new ActionError(
        'None of the connections can be verified by a test call.',
        400,
      );
    }

    return startJob({
      projectId: agent.projectId,
      userId: user.id,
      kind: JobKind.test_call,
      input: { agentId, connectionTypes: [connection.type] },
      initialStep: TEST_CALL_IN_PROGRESS_HEADLINE,
      run: async (context) => {
        await context.setResult(
          queuedProgress(agentId, connection.type, connection.target),
        );
        await context.setStep(`Calling ${connection.target}`);
        await context.setResult(
          inCallProgress(agentId, connection.type, connection.target),
        );
        const call = await getCallEngine().placeCall({
          direction: directionOf(agent.inbound),
          agent: {
            id: agent.id,
            name: agent.name,
            description: agent.description,
            language: agent.language,
            phoneNumber: agent.phoneNumber,
          },
          evaluator: {
            name: 'Connection test',
            instructions: TEST_CALL_INSTRUCTIONS,
            expectedOutcome: 'The agent answers and speaks.',
            firstMessage: TEST_CALL_FIRST_MESSAGE,
          },
          personality: {
            name: 'Connection test caller',
            gender: Gender.neutral,
            language: agent.language,
            speed: 'normal',
            interruptionLevel: InterruptionLevel.off,
            backgroundNoise: BackgroundNoise.off,
          },
          mainAgentVariables: [],
          testingAgentVariables: [],
          maxDurationSeconds: TEST_CALL_MAX_DURATION_SECONDS,
        });
        const progress = finishedProgress(
          agentId,
          connection.type,
          connection.target,
          call,
        );
        await context.setStep(progress.headline);
        await context.setResult({
          ...progress,
          summary: summaryOf(progress.connections[0].status),
          deepLink: UrlGenerator.agent({ agentId }),
        });
      },
    });
  },
);
