import { SLUG_SUFFIX_LENGTH } from '@/server/metrics/constants/definition/metric-limits';

const SUFFIX_ALPHABET = 'abcdefghijklmnopqrstuvwxyz0123456789';

export const randomSlugSuffix = () =>
  Array.from(
    { length: SLUG_SUFFIX_LENGTH },
    () => SUFFIX_ALPHABET[Math.floor(Math.random() * SUFFIX_ALPHABET.length)],
  ).join('');

export const toSlugBase = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');

export const buildSlug = (name: string, suffix: string) => {
  const base = toSlugBase(name);
  if (!base) return '';
  return `${base}_${suffix}`;
};
