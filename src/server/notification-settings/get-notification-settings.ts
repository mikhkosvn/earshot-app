import 'server-only';

import { prisma } from '@/lib/prisma';
import { withValidation } from '@/server/common/run-action';
import { notificationSettingsSelect } from '@/server/notification-settings/constants/notification-settings-select';
import { notificationSettingsIdSchema } from '@/server/notification-settings/schemas';
import type { NotificationSettings } from '@/server/notification-settings/types';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

export const getNotificationSettings = withValidation(
  notificationSettingsIdSchema,
  async ({ projectId }): Promise<NotificationSettings> => {
    await requireProjectAccess(projectId);
    return prisma.project.findUniqueOrThrow({
      where: { id: projectId },
      select: notificationSettingsSelect,
    });
  },
);
