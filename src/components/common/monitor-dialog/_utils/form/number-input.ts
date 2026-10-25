export const parseNumberInput = (value: string): number | null => {
  if (value.trim() === '') return null;
  const parsed = Number(value);
  if (Number.isNaN(parsed)) return null;
  return parsed;
};

export const numberInputValue = (value: number | null | undefined) => {
  if (value === null || value === undefined) return '';
  if (Number.isNaN(value)) return '';
  return String(value);
};
