import { createHash } from 'node:crypto';

const HEX_DIGITS = 8;
const HEX_RANGE = 0xffffffff;

export const stableRandom = (...parts: (string | number)[]) => {
  const digest = createHash('sha256').update(parts.join(':')).digest('hex');
  return Number.parseInt(digest.slice(0, HEX_DIGITS), 16) / HEX_RANGE;
};
