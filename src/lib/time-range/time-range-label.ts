import { ALL_QUICK_RANGES } from './constants';

export const timeRangeLabel = (from: string, to: string) => {
  const quick = ALL_QUICK_RANGES.find(
    (range) => range.from === from && range.to === to,
  );
  if (quick) return quick.label;
  return `${from} to ${to}`;
};
