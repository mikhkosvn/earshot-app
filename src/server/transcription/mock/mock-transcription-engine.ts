import 'server-only';

import {
  type DecodedWav,
  decodeWav,
} from '@/server/call-engine/audio/decode-wav';
import {
  TESTING_CHANNEL_INDEX,
  TranscriptRole,
} from '@/server/call-engine/constants';
import { WAV_CONTENT_TYPES } from '@/server/transcription/constants';
import { buildTurnSlots } from '@/server/transcription/mock/build-turn-slots';
import { generateTurnText } from '@/server/transcription/mock/generate-turn-text';
import type {
  TranscribeRecordingInput,
  Transcription,
  TranscriptionEngine,
  TranscriptionFile,
  TurnSlot,
} from '@/server/transcription/types';

const SHORT_SLOTS: TurnSlot[] = [
  { role: TranscriptRole.main_agent, startTime: 0, endTime: 3 },
  { role: TranscriptRole.testing_agent, startTime: 3.5, endTime: 7 },
  { role: TranscriptRole.main_agent, startTime: 7.5, endTime: 12 },
  { role: TranscriptRole.testing_agent, startTime: 12.5, endTime: 14.5 },
];

const isWav = (file: TranscriptionFile) =>
  WAV_CONTENT_TYPES.includes(file.contentType) ||
  file.fileName.toLowerCase().endsWith('.wav');

const decodeOrNull = (file: TranscriptionFile): DecodedWav | null => {
  if (!isWav(file)) return null;
  try {
    return decodeWav(file.data);
  } catch (error) {
    console.error(
      `[transcription] The file ${file.fileName} did not decode.`,
      error,
    );
    return null;
  }
};

const testingChannelOf = (recording: DecodedWav) => {
  if (recording.channels.length >= 2) return TESTING_CHANNEL_INDEX;
  return null;
};

const transcribe = async ({
  file,
  context,
}: TranscribeRecordingInput): Promise<Transcription> => {
  const recording = decodeOrNull(file);
  if (!recording) {
    return {
      turns: await generateTurnText(SHORT_SLOTS, context),
      durationSeconds: null,
      testingChannelIndex: null,
    };
  }
  const slots = buildTurnSlots(recording);
  return {
    turns: await generateTurnText(slots, context),
    durationSeconds: recording.durationSeconds,
    testingChannelIndex: testingChannelOf(recording),
  };
};

export const mockTranscriptionEngine: TranscriptionEngine = { transcribe };
