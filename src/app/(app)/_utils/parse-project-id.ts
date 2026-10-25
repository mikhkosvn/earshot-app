export const parseProjectId = (value: string | undefined) => {
  const projectId = Number(value);
  if (!Number.isInteger(projectId) || projectId <= 0) return null;
  return projectId;
};
