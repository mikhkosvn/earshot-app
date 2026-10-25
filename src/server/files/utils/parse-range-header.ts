import 'server-only';

import type { ByteRange } from '@/server/files/types';

export const RangeResult = {
  none: 'none',
  valid: 'valid',
  unsatisfiable: 'unsatisfiable',
} as const;

export type RangeResult = (typeof RangeResult)[keyof typeof RangeResult];

type ParsedRange =
  | { kind: typeof RangeResult.none }
  | { kind: typeof RangeResult.unsatisfiable }
  | { kind: typeof RangeResult.valid; range: ByteRange };

const RANGE_PATTERN = /^bytes=(\d*)-(\d*)$/;

const rangeEnd = (endText: string, size: number) => {
  if (!endText) return size - 1;
  return Math.min(Number(endText), size - 1);
};

export const parseRangeHeader = (
  header: string | null,
  size: number,
): ParsedRange => {
  if (!header) return { kind: RangeResult.none };
  const match = RANGE_PATTERN.exec(header.trim());
  if (!match) return { kind: RangeResult.none };
  const [, startText, endText] = match;
  if (!startText && !endText) return { kind: RangeResult.unsatisfiable };
  if (!startText) {
    const suffix = Number(endText);
    if (suffix === 0 || size === 0) return { kind: RangeResult.unsatisfiable };
    return {
      kind: RangeResult.valid,
      range: { start: Math.max(0, size - suffix), end: size - 1 },
    };
  }
  const start = Number(startText);
  const end = rangeEnd(endText, size);
  if (start >= size || end < start) return { kind: RangeResult.unsatisfiable };
  return { kind: RangeResult.valid, range: { start, end } };
};
