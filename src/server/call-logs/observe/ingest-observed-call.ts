import 'server-only';

import { prisma } from '@/lib/prisma';
import type { ApiKeyAuth } from '@/server/api-keys/types';
import { observeCallSchema } from '@/server/call-logs/schemas/observe';
import { createCallRecord } from '@/server/call-logs/utils/create-call-record';
import {
  publicCallLogSelect,
  toPublicCallLog,
} from '@/server/call-logs/utils/payload/public-call-log';
import { startCallProcessing } from '@/server/call-logs/utils/processing/start-call-processing';
import { ActionError } from '@/server/common/run-action';

const findAgent = async (auth: ApiKeyAuth, agentId: number) => {
  const agent = await prisma.agent.findFirst({
    where: {
      id: agentId,
      project: { organizationId: auth.organizationId },
      ...(auth.projectId && { projectId: auth.projectId }),
    },
    select: { id: true, projectId: true },
  });
  if (!agent) throw new ActionError('The agent does not exist.', 404);
  return agent;
};

export const ingestObservedCall = async ({
  auth,
  body,
  origin,
}: {
  auth: ApiKeyAuth;
  body: unknown;
  origin: string | null;
}) => {
  const input = observeCallSchema.parse(body);
  const agent = await findAgent(auth, input.agent);
  const callLog = await prisma.$transaction((tx) =>
    createCallRecord(tx, {
      projectId: agent.projectId,
      agentId: agent.id,
      externalCallId: input.call_id,
      customerNumber: input.customer_number || null,
      startedAt: new Date(input.timestamp ?? Date.now()),
      endedReason: input.call_ended_reason || null,
      recordingFileId: null,
      metadata: input.metadata,
      dynamicVariables: input.dynamic_variables,
      turns: input.transcript_json.map((turn) => ({
        role: turn.role,
        content: turn.content,
        startTime: turn.start_time ?? null,
        endTime: turn.end_time ?? null,
      })),
    }),
  );
  await startCallProcessing(agent.projectId, {
    callLogId: callLog.id,
    recordingUrl: input.voice_recording_url ?? null,
    origin,
  });
  const record = await prisma.callLog.findUniqueOrThrow({
    where: { id: callLog.id },
    select: publicCallLogSelect,
  });
  return toPublicCallLog(record, origin);
};
