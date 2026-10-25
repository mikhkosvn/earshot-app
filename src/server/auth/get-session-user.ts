import 'server-only';

import { cache } from 'react';

import { prisma } from '@/lib/prisma';

import { readSessionCookie } from './utils/session-cookie';
import { hashSessionToken } from './utils/session-token';

export const getSessionUser = cache(async () => {
  const token = await readSessionCookie();
  if (!token) return null;

  const session = await prisma.session.findUnique({
    where: { id: hashSessionToken(token) },
    select: {
      expiresAt: true,
      user: {
        select: { id: true, email: true, name: true, createdAt: true },
      },
    },
  });
  if (!session || session.expiresAt <= new Date()) return null;

  return session.user;
});
