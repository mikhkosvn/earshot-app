import 'server-only';

import { prisma } from '@/lib/prisma';
import { requireUser } from '@/server/auth';
import { withValidation } from '@/server/common/run-action';
import { notificationIdSchema } from '@/server/notifications/schemas';

export const markNotificationRead = withValidation(
  notificationIdSchema,
  async ({ notificationId }) => {
    const { user } = await requireUser();
    const notification = await prisma.notification.findUniqueOrThrow({
      where: { id: notificationId, userId: user.id },
      select: { id: true, readAt: true },
    });
    if (notification.readAt) return { id: notification.id };

    await prisma.notification.update({
      where: { id: notification.id },
      data: { readAt: new Date() },
    });
    return { id: notification.id };
  },
);
