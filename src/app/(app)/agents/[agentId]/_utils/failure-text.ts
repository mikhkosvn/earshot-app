export const failureText = (count: number) => {
  if (count === 1) return '1 failure';
  return `${count} failures`;
};
