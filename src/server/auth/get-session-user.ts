import 'server-only';

import { cache } from 'react';

import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';

import { readSessionCookie } from './utils/session-cookie';
import { hashSessionToken } from './utils/session-token';

const readSessionUser = cache(async () => {
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

export const getSessionUser = async () => {
  const user = await readSessionUser();
  if (!user) return null;
  addEventFields({
    user: { id: user.id, created_at: user.createdAt.toISOString() },
  });
  return user;
};
