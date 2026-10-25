import 'server-only';

import type { DecodedWav } from '@/server/call-engine/audio/decode-wav';

export const FRAME_SECONDS = 0.04;
export const HOP_SECONDS = 0.02;
export const SPEECH_RMS_THRESHOLD = 400;

export const channelOf = (recording: DecodedWav, index: number) =>
  recording.channels[index] ?? recording.channels[0];

export const frameRms = (
  samples: Int16Array,
  start: number,
  length: number,
) => {
  const end = Math.min(samples.length, start + length);
  if (end <= start) return 0;
  let sum = 0;
  for (let index = start; index < end; index += 1) {
    sum += samples[index] * samples[index];
  }
  return Math.sqrt(sum / (end - start));
};

export const speechOnset = (
  recording: DecodedWav,
  channelIndex: number,
  fromSeconds: number,
  toSeconds: number,
) => {
  const samples = channelOf(recording, channelIndex);
  const rate = recording.sampleRate;
  const frame = Math.round(FRAME_SECONDS * rate);
  const hop = Math.round(HOP_SECONDS * rate);
  const end = Math.min(samples.length, Math.round(toSeconds * rate));
  for (
    let start = Math.max(0, Math.round(fromSeconds * rate));
    start < end;
    start += hop
  ) {
    if (frameRms(samples, start, frame) >= SPEECH_RMS_THRESHOLD) {
      return start / rate;
    }
  }
  return null;
};

export const speechOffset = (
  recording: DecodedWav,
  channelIndex: number,
  fromSeconds: number,
  toSeconds: number,
) => {
  const samples = channelOf(recording, channelIndex);
  const rate = recording.sampleRate;
  const frame = Math.round(FRAME_SECONDS * rate);
  const hop = Math.round(HOP_SECONDS * rate);
  const silentFramesNeeded = Math.round(0.3 / HOP_SECONDS);
  let silentFrames = 0;
  const end = Math.min(samples.length, Math.round(toSeconds * rate));
  for (
    let start = Math.max(0, Math.round(fromSeconds * rate));
    start < end;
    start += hop
  ) {
    if (frameRms(samples, start, frame) < SPEECH_RMS_THRESHOLD) {
      silentFrames += 1;
      if (silentFrames >= silentFramesNeeded) {
        return start / rate - (silentFramesNeeded - 1) * HOP_SECONDS;
      }
      continue;
    }
    silentFrames = 0;
  }
  return null;
};
