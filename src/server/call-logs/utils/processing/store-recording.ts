import 'server-only';

import { prisma } from '@/lib/prisma';
import { computeWaveform } from '@/server/call-engine/audio/compute-waveform';
import { decodeWav } from '@/server/call-engine/audio/decode-wav';
import { TESTING_CHANNEL_INDEX } from '@/server/call-engine/constants';
import { saveFile } from '@/server/files/save-file';
import type { TranscriptionFile } from '@/server/transcription/types';

const decodedOrNull = (file: TranscriptionFile) => {
  try {
    return decodeWav(file.data);
  } catch {
    return null;
  }
};

export const applyRecordingDetails = async (
  conversationId: number,
  file: TranscriptionFile,
) => {
  const recording = decodedOrNull(file);
  if (!recording) return null;
  const testingChannelIndex = Math.min(
    TESTING_CHANNEL_INDEX,
    recording.channels.length - 1,
  );
  const waveform = computeWaveform({
    channels: recording.channels,
    sampleRate: recording.sampleRate,
    testingChannelIndex,
  });
  await prisma.conversation.update({
    where: { id: conversationId },
    data: {
      waveform,
      testingChannelIndex,
    },
  });
  return recording.durationSeconds;
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
