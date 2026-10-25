import 'server-only';

import { prisma } from '@/lib/prisma';
import {
  clearSessionCookie,
  readSessionCookie,
} from '@/server/auth/utils/session-cookie';
import { hashSessionToken } from '@/server/auth/utils/session-token';

export const signOut = async () => {
  const token = await readSessionCookie();
  if (token) {
    await prisma.session.deleteMany({ where: { id: hashSessionToken(token) } });
  }
  await clearSessionCookie();
  return { signedOut: true };
};
