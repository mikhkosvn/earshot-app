export const secretPlaceholder = (secretConfigured: boolean) => {
  if (secretConfigured)
    return '•••••••• Saved. Type a new secret to replace it.';
  return '';
};
