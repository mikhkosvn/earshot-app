import type { z } from 'zod';

import type {
  NotificationEventType,
  NotificationSeverity,
} from '@/generated/prisma/enums';
import type { notificationIdSchema } from '@/server/notifications/schemas';

export type NotificationIdInput = z.input<typeof notificationIdSchema>;

export type NotificationItem = {
  id: number;
  eventType: NotificationEventType;
  severity: NotificationSeverity;
  title: string;
  body: string;
  deepLink: string | null;
  readAt: Date | null;
  createdAt: Date;
};
