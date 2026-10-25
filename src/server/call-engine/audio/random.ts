import 'server-only';

export interface Random {
  next: () => number;
  between: (min: number, max: number) => number;
  int: (min: number, max: number) => number;
}

const hashSeed = (seed: string) => {
  let hash = 2166136261;
  for (let index = 0; index < seed.length; index += 1) {
    hash ^= seed.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
};

export const createRandom = (seed: string): Random => {
  let state = hashSeed(seed);
  const next = () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
  const between = (min: number, max: number) => min + next() * (max - min);
  const int = (min: number, max: number) => Math.floor(between(min, max + 1));
  return { next, between, int };
};
