export const numberInputValue = (value: number | null | undefined) => {
  if (value === null || value === undefined || Number.isNaN(value)) return '';
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
