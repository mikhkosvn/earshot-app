import 'server-only';

import type { Random } from '@/server/call-engine/audio/random';

export interface Voice {
  pitchHz: number;
  wordsPerSecond: number;
}

const HARMONICS = 6;
const SPEECH_GAIN = 0.32;
const NOISE_SHARE = 0.35;

const writeSyllable = (
  samples: Float32Array,
  {
    start,
    length,
    pitchHz,
    sampleRate,
    random,
  }: {
    start: number;
    length: number;
    pitchHz: number;
    sampleRate: number;
    random: Random;
  },
) => {
  const loudness = random.between(0.6, 1);
  const glide = random.between(-0.12, 0.12);
  let noiseState = 0;
  let phase = random.next() * Math.PI * 2;
  for (let index = 0; index < length; index += 1) {
    const position = start + index;
    if (position >= samples.length) return;
    const progress = index / length;
    const envelope = Math.sin(Math.PI * progress) ** 2;
    const frequency = pitchHz * (1 + glide * progress);
    phase += (2 * Math.PI * frequency) / sampleRate;
    let voiced = 0;
    for (let harmonic = 1; harmonic <= HARMONICS; harmonic += 1) {
      voiced += Math.sin(phase * harmonic) / harmonic;
    }
    noiseState = noiseState * 0.7 + (random.next() * 2 - 1) * 0.3;
    const value =
      (voiced * (1 - NOISE_SHARE)) / 1.6 + noiseState * NOISE_SHARE * 2;
    samples[position] += value * envelope * loudness * SPEECH_GAIN;
  }
};

const wordGap = (random: Random) => {
  if (random.next() < 0.12) return random.between(0.2, 0.32);
  return random.between(0.03, 0.1);
};

export const writeSpeech = (
  samples: Float32Array,
  {
    startSeconds,
    endSeconds,
    voice,
    sampleRate,
    random,
  }: {
    startSeconds: number;
    endSeconds: number;
    voice: Voice;
    sampleRate: number;
    random: Random;
  },
) => {
  const syllableSeconds = 1 / (voice.wordsPerSecond * 1.5);
  let cursor = startSeconds;
  while (cursor < endSeconds - 0.08) {
    const syllables = random.int(1, 3);
    for (
      let syllable = 0;
      syllable < syllables && cursor < endSeconds - 0.08;
      syllable += 1
    ) {
      const length = Math.min(
        syllableSeconds * random.between(0.7, 1.3),
        endSeconds - cursor,
      );
      writeSyllable(samples, {
        start: Math.floor(cursor * sampleRate),
        length: Math.floor(length * sampleRate),
        pitchHz: voice.pitchHz * random.between(0.9, 1.1),
        sampleRate,
        random,
      });
      cursor += length;
    }
    cursor += wordGap(random);
  }
};

export const writeBackgroundNoise = (
  samples: Float32Array,
  { level, random }: { level: number; random: Random },
) => {
  let state = 0;
  for (let index = 0; index < samples.length; index += 1) {
    state = state * 0.85 + (random.next() * 2 - 1) * 0.15;
    samples[index] += state * level;
  }
};

export const toInt16 = (samples: Float32Array) => {
  const output = new Int16Array(samples.length);
  for (let index = 0; index < samples.length; index += 1) {
    const clamped = Math.max(-1, Math.min(1, samples[index]));
    output[index] = Math.round(clamped * 32767);
  }
  return output;
};
