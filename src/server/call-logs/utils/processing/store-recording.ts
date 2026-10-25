import 'server-only';

import { prisma } from '@/lib/prisma';
import { analyzeWavRecording } from '@/server/call-engine/audio/analyze-wav-recording';
import { saveFile } from '@/server/files/save-file';
import type { TranscriptionFile } from '@/server/transcription/types';

export const applyRecordingDetails = async (
  conversationId: number,
  file: TranscriptionFile,
) => {
  const details = analyzeWavRecording(file.data);
  if (!details) return null;
  await prisma.conversation.update({
    where: { id: conversationId },
    data: {
      waveform: details.waveform,
      testingChannelIndex: details.testingChannelIndex,
    },
  });
  return details.durationSeconds;
};

export const attachRecording = async ({
  projectId,
  conversationId,
  file,
}: {
  projectId: number;
  conversationId: number;
  file: TranscriptionFile;
}) => {
  const stored = await saveFile({
    projectId,
    fileName: file.fileName,
    contentType: file.contentType,
    data: file.data,
  });
  await prisma.conversation.update({
    where: { id: conversationId },
    data: { recordingFileId: stored.id },
  });
  return applyRecordingDetails(conversationId, file);
};
