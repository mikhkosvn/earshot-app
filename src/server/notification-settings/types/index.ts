import type { z } from 'zod';

import type {
  notificationSettingsIdSchema,
  notificationSettingsSchema,
  updateNotificationSettingsSchema,
} from '@/server/notification-settings/schemas';

export type NotificationSettingsIdInput = z.input<
  typeof notificationSettingsIdSchema
>;
export type UpdateNotificationSettingsInput = z.input<
  typeof updateNotificationSettingsSchema
>;
export type NotificationSettings = z.output<typeof notificationSettingsSchema>;
