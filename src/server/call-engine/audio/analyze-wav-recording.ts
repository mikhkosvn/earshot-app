import 'server-only';

import { computeWaveform } from '@/server/call-engine/audio/compute-waveform';
import { decodeWav } from '@/server/call-engine/audio/decode-wav';
import { TESTING_CHANNEL_INDEX } from '@/server/call-engine/constants';

const decodedOrNull = (data: Uint8Array) => {
  try {
    return decodeWav(data);
  } catch {
    return null;
  }
};

export const analyzeWavRecording = (data: Uint8Array) => {
  const recording = decodedOrNull(data);
  if (!recording) return null;
  const testingChannelIndex = Math.min(
    TESTING_CHANNEL_INDEX,
    recording.channels.length - 1,
  );
  return {
    testingChannelIndex,
    durationSeconds: recording.durationSeconds,
    waveform: computeWaveform({
      channels: recording.channels,
      sampleRate: recording.sampleRate,
      testingChannelIndex,
    }),
  };
};
