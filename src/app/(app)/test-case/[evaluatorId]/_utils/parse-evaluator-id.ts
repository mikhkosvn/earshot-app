export const parseEvaluatorId = (value: string | undefined) => {
  const id = Number(value);
  if (!Number.isInteger(id) || id <= 0) return null;
  return id;
};
