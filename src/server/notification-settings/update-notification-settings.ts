import 'server-only';

import { prisma } from '@/lib/prisma';
import { withValidation } from '@/server/common/run-action';
import { notificationSettingsSelect } from '@/server/notification-settings/constants/notification-settings-select';
import { updateNotificationSettingsSchema } from '@/server/notification-settings/schemas';
import type { NotificationSettings } from '@/server/notification-settings/types';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

export const updateNotificationSettings = withValidation(
  updateNotificationSettingsSchema,
  async ({ projectId, ...data }): Promise<NotificationSettings> => {
    await requireProjectAccess(projectId);
    return prisma.project.update({
      where: { id: projectId },
      data,
      select: notificationSettingsSelect,
    });
  },
);
