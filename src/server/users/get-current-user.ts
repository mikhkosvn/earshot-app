import 'server-only';

import { prisma } from '@/lib/prisma';
import { requireUser } from '@/server/auth';
import type { CurrentUser } from '@/server/users/types';

export const getCurrentUser = async (): Promise<CurrentUser> => {
  const { user } = await requireUser();
  const lastSession = await prisma.session.findFirst({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
    select: { createdAt: true },
  });
  return { ...user, lastSignInAt: lastSession?.createdAt ?? null };
};
