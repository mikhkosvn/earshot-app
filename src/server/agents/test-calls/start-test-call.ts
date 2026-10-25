import 'server-only';

import {
  BackgroundNoise,
  InterruptionLevel,
  JobKind,
  type Language,
} from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import {
  TEST_CALL_FIRST_MESSAGE,
  TEST_CALL_IN_PROGRESS_HEADLINE,
  TEST_CALL_MAX_DURATION_SECONDS,
} from '@/server/agents/constants/test-call';
import { agentIdSchema } from '@/server/agents/schemas';
import {
  inCallProgress,
  queuedProgress,
} from '@/server/agents/test-calls/test-call-progress';
import type { StartedTestCall } from '@/server/agents/types';
import { checkConnections } from '@/server/agents/utils/check-connections';
import { requireAgentAccess } from '@/server/agents/utils/require-agent-access';
import { CallDirection, CallRefKind } from '@/server/call-engine/constants';
import { getCallEngine } from '@/server/call-engine/get-call-engine';
import type { StartCallRequest } from '@/server/call-engine/types';
import { formatCallRef } from '@/server/call-engine/utils/call-ref';
import { ActionError, withValidation } from '@/server/common/run-action';
import { JobCompletion } from '@/server/jobs/constants';
import { startJob } from '@/server/jobs/start-job';

const TEST_CALL_INSTRUCTIONS =
  'You call to check that the line works. Ask if the agent can hear you. When the agent replies, say okay and end the call.';

interface TestCallRequestArgs {
  jobId: string;
  toNumber: string;
  inbound: boolean;
  language: Language;
}

const directionOf = (inbound: boolean) => {
  if (inbound) return CallDirection.outbound;
  return CallDirection.inbound;
};

const buildTestCallRequest = ({
  jobId,
  toNumber,
  inbound,
  language,
}: TestCallRequestArgs): StartCallRequest => ({
  call_ref: formatCallRef(CallRefKind.test_call, jobId),
  direction: directionOf(inbound),
  to_number: toNumber,
  from_number: null,
  max_duration_seconds: TEST_CALL_MAX_DURATION_SECONDS,
  caller: {
    instructions: TEST_CALL_INSTRUCTIONS,
    first_message: TEST_CALL_FIRST_MESSAGE,
    variables: {},
    prompt: '',
    language,
    accent: null,
    voice_model: null,
    voice_id: null,
    speed: null,
    interruption_level: InterruptionLevel.off,
    background_noise: BackgroundNoise.off,
  },
});

export const startTestCall = withValidation(
  agentIdSchema,
  async ({ agentId }): Promise<StartedTestCall> => {
    const { user } = await requireAgentAccess(agentId);
    const agent = await prisma.agent.findUniqueOrThrow({
      where: { id: agentId },
      select: {
        id: true,
        projectId: true,
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
    const target = connection?.target;
    if (!connection || !target) {
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
      completion: JobCompletion.external,
      run: async (context) => {
        await context.setResult(
          queuedProgress(agentId, connection.type, target),
        );
        await context.setStep(`Calling ${target}`);
        await context.setResult(
          inCallProgress(agentId, connection.type, target),
        );
        await getCallEngine().startCall(
          buildTestCallRequest({
            jobId: context.jobId,
            toNumber: target,
            inbound: agent.inbound,
            language: agent.language,
          }),
        );
      },
    });
  },
);
