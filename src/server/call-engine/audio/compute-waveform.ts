import 'server-only';

import {
  MAIN_CHANNEL_INDEX,
  TESTING_CHANNEL_INDEX,
  WAVEFORM_PEAK_COUNT,
  WAVEFORM_VERSION,
} from '@/server/call-engine/constants';
import type { CallWaveform } from '@/server/call-engine/types';

const SPEECH_THRESHOLD = 0.06;
const MIN_SILENCE_SECONDS = 0.6;
const PCM_FULL_SCALE = 32768;

const computePeaks = (samples: Int16Array, peakCount: number) => {
  const bucketSize = samples.length / peakCount;
  return Array.from({ length: peakCount }, (_, bucket) => {
    const start = Math.floor(bucket * bucketSize);
    const end = Math.max(start + 1, Math.floor((bucket + 1) * bucketSize));
    let peak = 0;
    for (let index = start; index < end && index < samples.length; index += 1) {
      peak = Math.max(peak, Math.abs(samples[index]));
    }
    return Math.round((peak / PCM_FULL_SCALE) * 1000) / 1000;
  });
};

const countSpeechSegments = (peaks: number[], secondsPerPeak: number) => {
  const minSilentPeaks = Math.max(
    1,
    Math.ceil(MIN_SILENCE_SECONDS / secondsPerPeak),
  );
  let segments = 0;
  let speaking = false;
  let silentRun = minSilentPeaks;
  for (const peak of peaks) {
    if (peak >= SPEECH_THRESHOLD) {
      if (!speaking && silentRun >= minSilentPeaks) segments += 1;
      speaking = true;
      silentRun = 0;
      continue;
    }
    silentRun += 1;
    if (silentRun >= minSilentPeaks) speaking = false;
  }
  return segments;
};

const mainChannelOf = (testingChannelIndex: number) => {
  if (testingChannelIndex === MAIN_CHANNEL_INDEX) return TESTING_CHANNEL_INDEX;
  return MAIN_CHANNEL_INDEX;
};

export const computeWaveform = ({
  channels,
  sampleRate,
  testingChannelIndex,
  peakCount = WAVEFORM_PEAK_COUNT,
}: {
  channels: Int16Array[];
  sampleRate: number;
  testingChannelIndex: number;
  peakCount?: number;
}): CallWaveform => {
  const frameCount = channels[0]?.length ?? 0;
  const duration = Math.round((frameCount / sampleRate) * 100) / 100;
  const peaks = channels.map((samples) => computePeaks(samples, peakCount));
  const secondsPerPeak = duration / peakCount;
  return {
    version: WAVEFORM_VERSION,
    peaks,
    duration,
    sampleRate,
    testingChannelIndex,
    mainSpeaking: countSpeechSegments(
      peaks[mainChannelOf(testingChannelIndex)] ?? [],
      secondsPerPeak,
    ),
    testingSpeaking: countSpeechSegments(
      peaks[testingChannelIndex] ?? [],
      secondsPerPeak,
    ),
  };
};
