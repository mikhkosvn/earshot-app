import 'server-only';

import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
import { requireUser } from '@/server/auth';

export const markAllNotificationsRead = async () => {
  const { user } = await requireUser();
  const { count } = await prisma.notification.updateMany({
    where: { userId: user.id, readAt: null },
    data: { readAt: new Date() },
  });
  addEventFields({ notifications: { marked_read_count: count } });
  return { count };
};
