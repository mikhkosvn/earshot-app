import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { readFileBytes } from '@/server/files/read-file-bytes';
import { saveFile } from '@/server/files/save-file';

type RecordingSource = {
  storageKey: string;
  fileName: string;
  contentType: string;
};

const jsonInput = (value: Prisma.JsonValue | null) => {
  if (value === null) return Prisma.DbNull;
  return value as Prisma.InputJsonValue;
};

const copyRecording = async (
  projectId: number,
  file: RecordingSource | null,
) => {
  if (!file) return null;
  const data = await readFileBytes(file);
  const copy = await saveFile({
    projectId,
    fileName: file.fileName,
    contentType: file.contentType,
    data,
  });
  return copy.id;
};

export const copyConversation = async (
  projectId: number,
  conversationId: number,
) => {
  const source = await prisma.conversation.findUniqueOrThrow({
    where: { id: conversationId, projectId },
    include: {
      turns: { orderBy: { position: Prisma.SortOrder.asc } },
      recordingFile: true,
    },
  });
  const recordingFileId = await copyRecording(projectId, source.recordingFile);
  return prisma.conversation.create({
    data: {
      projectId,
      copiedFromId: source.id,
      recordingFileId,
      waveform: jsonInput(source.waveform),
      testingChannelIndex: source.testingChannelIndex,
      startedAt: source.startedAt,
      endedAt: source.endedAt,
      ringingDurationSeconds: source.ringingDurationSeconds,
      endedReason: source.endedReason,
      providerCallId: source.providerCallId,
      providerCallData: jsonInput(source.providerCallData),
      metadata: jsonInput(source.metadata),
      dynamicVariables: jsonInput(source.dynamicVariables),
      turns: {
        create: source.turns.map((turn) => ({
          position: turn.position,
          role: turn.role,
          content: turn.content,
          startTime: turn.startTime,
          endTime: turn.endTime,
        })),
      },
    },
    select: { id: true },
  });
};
