import 'server-only';

import { prisma } from '@/lib/prisma';
import { requireUser } from '@/server/auth';

export const countUnreadNotifications = async () => {
  const { user } = await requireUser();
  return prisma.notification.count({
    where: { userId: user.id, readAt: null },
  });
};
