import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { RunStatus } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import type { CallRecording, PlacedCall } from '@/server/call-engine/types';
import {
  CALL_UPLOAD_CONTENT_TYPE,
  CallUploadFormat,
} from '@/server/call-logs/constants/call-upload-format';
import { deleteFile } from '@/server/files/delete-file';
import { saveFile } from '@/server/files/save-file';
import { WAV_CONTENT_TYPES } from '@/server/transcription/constants';

interface StoreConversationArgs {
  projectId: number;
  conversationId: number;
  runId: number;
  call: PlacedCall;
  dynamicVariables: Record<string, string>;
}

const RECORDING_FILE_PREFIX = 'run-';

const recordingExtensionOf = (contentType: string) => {
  if (WAV_CONTENT_TYPES.includes(contentType)) {
    return `.${CallUploadFormat.wav}`;
  }
  const format = Object.values(CallUploadFormat).find(
    (value) => CALL_UPLOAD_CONTENT_TYPE[value] === contentType,
  );
  if (!format) return '';
  return `.${format}`;
};

const saveRecording = async (
  projectId: number,
  runId: number,
  recording: CallRecording | null,
) => {
  if (!recording) return null;
  const file = await saveFile({
    projectId,
    fileName: `${RECORDING_FILE_PREFIX}${runId}${recordingExtensionOf(recording.contentType)}`,
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
  const stored = await prisma.$transaction(async (tx) => {
    const { count } = await tx.run.updateMany({
      where: { id: runId, status: RunStatus.in_progress },
      data: { status: RunStatus.evaluating },
    });
    if (count === 0) return false;
    await tx.transcriptTurn.deleteMany({ where: { conversationId } });
    await tx.transcriptTurn.createMany({
      data: call.turns.map((turn, position) => ({
        conversationId,
        position,
        role: turn.role,
        content: turn.content,
        startTime: turn.startTime,
        endTime: turn.endTime,
      })),
    });
    await tx.conversation.update({
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
        dynamicVariables,
      },
    });
    return true;
  });
  if (!stored && recordingFileId) await deleteFile(recordingFileId);
  return stored;
};
