import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import type { CallRecording, PlacedCall } from '@/server/call-engine/types';
import { saveFile } from '@/server/files/save-file';

type StoreConversationArgs = {
  projectId: number;
  conversationId: number;
  runId: number;
  call: PlacedCall;
  dynamicVariables: Record<string, string>;
};

const RECORDING_FILE_PREFIX = 'run-';
const RECORDING_FILE_EXTENSION = '.wav';

const saveRecording = async (
  projectId: number,
  runId: number,
  recording: CallRecording | null,
) => {
  if (!recording) return null;
  const file = await saveFile({
    projectId,
    fileName: `${RECORDING_FILE_PREFIX}${runId}${RECORDING_FILE_EXTENSION}`,
    contentType: recording.contentType,
    data: recording.data,
  });
  return file.id;
};

const jsonOrNull = (value: object | null) => {
  if (!value) return Prisma.DbNull;
  return value as Prisma.InputJsonObject;
};

const ringingSecondsOf = (metadata: Record<string, unknown>) => {
  const value = metadata.ringing_duration;
  if (typeof value === 'number') return value;
  return null;
};

export const storeConversation = async ({
  projectId,
  conversationId,
  runId,
  call,
  dynamicVariables,
}: StoreConversationArgs) => {
  const recordingFileId = await saveRecording(projectId, runId, call.recording);
  await prisma.$transaction([
    prisma.transcriptTurn.deleteMany({ where: { conversationId } }),
    prisma.transcriptTurn.createMany({
      data: call.turns.map((turn, position) => ({
        conversationId,
        position,
        role: turn.role,
        content: turn.content,
        startTime: turn.startTime,
        endTime: turn.endTime,
      })),
    }),
    prisma.conversation.update({
      where: { id: conversationId },
      data: {
        recordingFileId,
        waveform: jsonOrNull(call.waveform),
        testingChannelIndex: call.recording?.testingChannelIndex ?? null,
        startedAt: call.startedAt,
        endedAt: call.endedAt,
        ringingDurationSeconds: ringingSecondsOf(call.metadata),
        endedReason: call.endedReason,
        providerCallId: call.providerCallId,
        providerCallData: call.providerCallData as Prisma.InputJsonObject,
        metadata: call.metadata as Prisma.InputJsonObject,
        dynamicVariables: dynamicVariables as Prisma.InputJsonObject,
      },
    }),
  ]);
};
