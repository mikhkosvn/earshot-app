import 'server-only';

import { computeWaveform } from '@/server/call-engine/audio/compute-waveform';
import { encodeWav } from '@/server/call-engine/audio/encode-wav';
import type { Random } from '@/server/call-engine/audio/random';
import {
  toInt16,
  type Voice,
  writeBackgroundNoise,
  writeSpeech,
} from '@/server/call-engine/audio/synthesize-speech';
import {
  MAIN_CHANNEL_INDEX,
  RECORDING_CHANNELS,
  RECORDING_CONTENT_TYPE,
  RECORDING_SAMPLE_RATE,
  TESTING_CHANNEL_INDEX,
  TranscriptRole,
} from '@/server/call-engine/constants';
import type {
  CallRecording,
  CallWaveform,
  TranscriptTurn,
} from '@/server/call-engine/types';

const channelOf = (role: TranscriptRole) => {
  if (role === TranscriptRole.main_agent) return MAIN_CHANNEL_INDEX;
  return TESTING_CHANNEL_INDEX;
};

export const synthesizeCallAudio = ({
  turns,
  durationSeconds,
  voices,
  backgroundNoise,
  random,
}: {
  turns: TranscriptTurn[];
  durationSeconds: number;
  voices: Record<TranscriptRole, Voice>;
  backgroundNoise: number;
  random: Random;
}): { recording: CallRecording; waveform: CallWaveform } => {
  const sampleRate = RECORDING_SAMPLE_RATE;
  const frameCount = Math.ceil(durationSeconds * sampleRate);
  const floats = Array.from(
    { length: RECORDING_CHANNELS },
    () => new Float32Array(frameCount),
  );
  if (backgroundNoise > 0) {
    writeBackgroundNoise(floats[TESTING_CHANNEL_INDEX], {
      level: backgroundNoise,
      random,
    });
  }
  for (const turn of turns) {
    writeSpeech(floats[channelOf(turn.role)], {
      startSeconds: turn.startTime,
      endSeconds: turn.endTime,
      voice: voices[turn.role],
      sampleRate,
      random,
    });
  }
  const channels = floats.map(toInt16);
  return {
    recording: {
      data: encodeWav({ channels, sampleRate }),
      contentType: RECORDING_CONTENT_TYPE,
      durationSeconds: Math.round((frameCount / sampleRate) * 100) / 100,
      sampleRate,
      channels: RECORDING_CHANNELS,
      testingChannelIndex: TESTING_CHANNEL_INDEX,
    },
    waveform: computeWaveform({
      channels,
      sampleRate,
      testingChannelIndex: TESTING_CHANNEL_INDEX,
    }),
  };
};
