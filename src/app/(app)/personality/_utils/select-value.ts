export const selectValue = (value: unknown) => {
  if (typeof value === 'string') return value;
  return null;
};
