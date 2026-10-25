import 'server-only';

import { redirect } from 'next/navigation';
import { cache } from 'react';

import { prisma } from '@/lib/prisma';
import { UrlGenerator } from '@/lib/url-generator/url-generator';

import { readSessionCookie } from './utils/session-cookie';
import { hashSessionToken } from './utils/session-token';

export const requireUser = cache(async () => {
  const token = await readSessionCookie();
  if (!token) redirect(UrlGenerator.login());

  const session = await prisma.session.findUnique({
    where: { id: hashSessionToken(token) },
    select: {
      expiresAt: true,
      user: {
        select: { id: true, email: true, name: true, createdAt: true },
      },
    },
  });
  if (!session || session.expiresAt <= new Date()) {
    redirect(UrlGenerator.login());
  }

  return { user: session.user };
});
