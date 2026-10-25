'use server';

import type { ActionResult } from '@/lib/action-result';
import { runAction } from '@/server/common/run-action';
import { countUnreadNotifications } from '@/server/notifications/count-unread-notifications';
import { listNotifications } from '@/server/notifications/list-notifications';
import { markAllNotificationsRead } from '@/server/notifications/mark-all-notifications-read';
import { markNotificationRead } from '@/server/notifications/mark-notification-read';
import type {
  NotificationIdInput,
  NotificationItem,
} from '@/server/notifications/types';

export async function listNotificationsAction(): Promise<NotificationItem[]> {
  return listNotifications();
}

export async function countUnreadNotificationsAction(): Promise<number> {
  return countUnreadNotifications();
}

export async function markNotificationReadAction(
  args: NotificationIdInput,
): Promise<ActionResult<{ id: number }>> {
  return runAction(() => markNotificationRead(args));
}

export async function markAllNotificationsReadAction(): Promise<
  ActionResult<{ count: number }>
> {
  return runAction(() => markAllNotificationsRead());
}
