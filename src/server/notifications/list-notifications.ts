import 'server-only';

import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
import { requireUser } from '@/server/auth';
import { NOTIFICATION_LIST_LIMIT } from '@/server/notifications/constants';

export const listNotifications = async () => {
  const { user } = await requireUser();
  const notifications = await prisma.notification.findMany({
    where: { userId: user.id },
    orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
    take: NOTIFICATION_LIST_LIMIT,
    select: {
      id: true,
      eventType: true,
      severity: true,
      title: true,
      body: true,
      deepLink: true,
      readAt: true,
      createdAt: true,
    },
  });
  addEventFields({ notifications: { count: notifications.length } });
  return notifications;
};
