export const secretInputType = (isVisible: boolean) => {
  if (isVisible) return 'text';
  return 'password';
};
