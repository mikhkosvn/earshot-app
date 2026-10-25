import 'server-only';

const VISIBLE_CHARACTERS = 4;
const MASK = '••••••••••••';

export const maskSecret = (secret: string) => {
  if (secret.length <= VISIBLE_CHARACTERS * 2) return MASK;
  return `${MASK}${secret.slice(-VISIBLE_CHARACTERS)}`;
};
