import type { ConversationWaveformView } from '@/server/conversations/types';

export const WAVEFORM_BAR_COUNT = 200;

const peakOf = (values: number[]) =>
  Math.min(1, Math.max(0, ...values.map((value) => Math.abs(value))));

export const downsamplePeaks = (
  peaks: number[],
  count = WAVEFORM_BAR_COUNT,
) => {
  const total = Math.min(count, peaks.length);
  const size = peaks.length / Math.max(total, 1);
  return Array.from({ length: total }, (_, index) => {
    const start = Math.floor(index * size);
    const end = Math.max(Math.floor((index + 1) * size), start + 1);
    return peakOf(peaks.slice(start, end));
  });
};

export const waveformLanes = (waveform: ConversationWaveformView | null) => {
  if (!waveform) return { main: [], testing: [] };
  const testingIndex = waveform.testingChannelIndex;
  const mainIndex = 1 - testingIndex;
  return {
    main: waveform.peaks[mainIndex] ?? [],
    testing: waveform.peaks[testingIndex] ?? [],
  };
};
