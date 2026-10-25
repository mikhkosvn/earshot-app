import 'server-only';

import {
  MAX_PAUSE_SECONDS,
  MIN_SPEECH_SECONDS,
  SPEECH_FRAME_SECONDS,
  SPEECH_RMS_THRESHOLD,
} from '@/server/transcription/constants';
import type { SpeechSegment } from '@/server/transcription/types';

const frameRms = (samples: Int16Array, start: number, length: number) => {
  const end = Math.min(samples.length, start + length);
  if (end <= start) return 0;
  let sum = 0;
  for (let index = start; index < end; index += 1) {
    sum += samples[index] * samples[index];
  }
  return Math.sqrt(sum / (end - start));
};

const round2 = (value: number) => Math.round(value * 100) / 100;

export const detectSpeechSegments = (
  samples: Int16Array,
  sampleRate: number,
): SpeechSegment[] => {
  const frame = Math.max(1, Math.round(SPEECH_FRAME_SECONDS * sampleRate));
  const segments: SpeechSegment[] = [];
  let start: number | null = null;
  let lastVoiced = 0;
  for (let offset = 0; offset < samples.length; offset += frame) {
    const time = offset / sampleRate;
    if (frameRms(samples, offset, frame) >= SPEECH_RMS_THRESHOLD) {
      start ??= time;
      lastVoiced = time + SPEECH_FRAME_SECONDS;
      continue;
    }
    if (start !== null && time - lastVoiced >= MAX_PAUSE_SECONDS) {
      segments.push({ start, end: lastVoiced });
      start = null;
    }
  }
  if (start !== null) segments.push({ start, end: lastVoiced });
  return segments
    .filter((segment) => segment.end - segment.start >= MIN_SPEECH_SECONDS)
    .map((segment) => ({
      start: round2(segment.start),
      end: round2(segment.end),
    }));
};
