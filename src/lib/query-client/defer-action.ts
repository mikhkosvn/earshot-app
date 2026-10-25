export const deferAction = async <T>(action: () => Promise<T>): Promise<T> => {
  await Promise.resolve();
  return action();
};
