import 'server-only';

import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
import { requireUser } from '@/server/auth';

export const countUnreadNotifications = async () => {
  const { user } = await requireUser();
  const count = await prisma.notification.count({
    where: { userId: user.id, readAt: null },
  });
  addEventFields({ notifications: { unread_count: count } });
  return count;
};
