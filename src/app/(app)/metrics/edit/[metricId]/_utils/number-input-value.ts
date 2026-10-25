export const numberInputValue = (value: unknown) => {
  if (typeof value !== 'number' || Number.isNaN(value)) return '';
  return String(value);
};
