import 'server-only';

import {
  type DecodedWav,
  decodeWav,
} from '@/server/call-engine/audio/decode-wav';
import {
  TESTING_CHANNEL_INDEX,
  TranscriptRole,
} from '@/server/call-engine/constants';
import {
  addEventFields,
  recordStepFailure,
} from '@/server/common/logging/event-fields';
import {
  TranscriptionEngineKind,
  TranscriptionStep,
  WAV_CONTENT_TYPES,
} from '@/server/transcription/constants';
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
    recordStepFailure(TranscriptionStep.wav_decode, error);
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
    const turns = await generateTurnText(SHORT_SLOTS, context);
    addEventFields({
      transcription: {
        engine: TranscriptionEngineKind.mock,
        decoded: false,
        turn_count: turns.length,
      },
    });
    return { turns, durationSeconds: null, testingChannelIndex: null };
  }
  const turns = await generateTurnText(buildTurnSlots(recording), context);
  addEventFields({
    transcription: {
      engine: TranscriptionEngineKind.mock,
      decoded: true,
      channel_count: recording.channels.length,
      duration_seconds: recording.durationSeconds,
      turn_count: turns.length,
    },
  });
  return {
    turns,
    durationSeconds: recording.durationSeconds,
    testingChannelIndex: testingChannelOf(recording),
  };
};

export const mockTranscriptionEngine: TranscriptionEngine = { transcribe };
