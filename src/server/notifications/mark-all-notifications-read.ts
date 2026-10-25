import 'server-only';

import { prisma } from '@/lib/prisma';
import { requireUser } from '@/server/auth';

export const markAllNotificationsRead = async () => {
  const { user } = await requireUser();
  const { count } = await prisma.notification.updateMany({
    where: { userId: user.id, readAt: null },
    data: { readAt: new Date() },
  });
  return { count };
};
