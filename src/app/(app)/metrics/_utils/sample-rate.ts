const PERCENT_SCALE = 100;
const DISPLAY_PRECISION = 1000;

export const toPercentInput = (rate: number | null | undefined) => {
  if (rate === null || rate === undefined || Number.isNaN(rate)) return '';
  return String(
    Math.round(rate * PERCENT_SCALE * DISPLAY_PRECISION) / DISPLAY_PRECISION,
  );
};

export const fromPercentInput = (text: string, valueAsNumber: number) => {
  if (text.trim() === '') return null;
  return valueAsNumber / PERCENT_SCALE;
};
