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
import { NotificationsActionOperation } from '@/server/notifications/actions/action-operation';
import { withActionEvent } from '@/server/common/logging/with-action-event';

export async function listNotificationsAction(): Promise<NotificationItem[]> {
  return withActionEvent(NotificationsActionOperation.listNotifications, () =>
    listNotifications(),
  );
}

export async function countUnreadNotificationsAction(): Promise<number> {
  return withActionEvent(
    NotificationsActionOperation.countUnreadNotifications,
    () => countUnreadNotifications(),
  );
}

export async function markNotificationReadAction(
  args: NotificationIdInput,
): Promise<ActionResult<{ id: number }>> {
  return withActionEvent(
    NotificationsActionOperation.markNotificationRead,
    () => runAction(() => markNotificationRead(args)),
  );
}

export async function markAllNotificationsReadAction(): Promise<
  ActionResult<{ count: number }>
> {
  return withActionEvent(
    NotificationsActionOperation.markAllNotificationsRead,
    () => runAction(() => markAllNotificationsRead()),
  );
}
