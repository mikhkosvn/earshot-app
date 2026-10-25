const DISPLAY_PRECISION = 1e6;

export const toNumberInputValue = (value: number, scale: number) => {
  if (Number.isNaN(value)) return '';
  return Math.round(value * scale * DISPLAY_PRECISION) / DISPLAY_PRECISION;
};
