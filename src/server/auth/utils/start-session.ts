import 'server-only';

import { prisma } from '@/lib/prisma';
import { SESSION_MAX_AGE_SECONDS } from '@/server/auth/constants/session';

import { setSessionCookie } from './session-cookie';
import { createSessionToken, hashSessionToken } from './session-token';

export const startSession = async (userId: number) => {
  const token = createSessionToken();
  const expiresAt = new Date(Date.now() + SESSION_MAX_AGE_SECONDS * 1000);
  await prisma.session.create({
    data: { id: hashSessionToken(token), userId, expiresAt },
  });
  await setSessionCookie(token, expiresAt);
};
