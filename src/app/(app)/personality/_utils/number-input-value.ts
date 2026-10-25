export const numberInputValue = (value: unknown) => {
  if (typeof value !== 'number' || Number.isNaN(value)) return '';
  return value;
};

export const parseOptionalNumber = (text: string) => {
  if (text.trim() === '') return null;
  return Number(text);
};

export const sliderValue = (value: number | readonly number[]) => {
  if (typeof value === 'number') return value;
  return value[0] ?? 0;
};
