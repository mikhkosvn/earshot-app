import 'server-only';

import { headers } from 'next/headers';

const FORWARDED_PROTO = 'x-forwarded-proto';
const DEFAULT_PROTOCOL = 'http';

export const requestOrigin = async () => {
  const list = await headers();
  const origin = list.get('origin');
  if (origin) return origin;
  const host = list.get('host');
  if (!host) return null;
  return `${list.get(FORWARDED_PROTO) ?? DEFAULT_PROTOCOL}://${host}`;
};
