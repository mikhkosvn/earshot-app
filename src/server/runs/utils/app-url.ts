import 'server-only';

export const appUrl = (path: string) => {
  const base = process.env.APP_URL?.replace(/\/+$/, '');
  if (!base) return path;
  return `${base}${path}`;
};
