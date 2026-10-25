const UNNAMED_OPERATION = 'unnamed';

export const readOperationName = (key: readonly unknown[] | undefined) => {
  const first = key?.[0];
  if (typeof first === 'string') return first;
  return UNNAMED_OPERATION;
};
