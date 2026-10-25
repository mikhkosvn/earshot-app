export const outsideRender = async <T>(action: () => Promise<T>) => {
  await Promise.resolve();
  return action();
};
