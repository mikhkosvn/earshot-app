'use server';

import type { ActionResult } from '@/lib/action-result';
import { runAction } from '@/server/common/run-action';
import { getNotificationSettings } from '@/server/notification-settings/get-notification-settings';
import type {
  NotificationSettings,
  NotificationSettingsIdInput,
  UpdateNotificationSettingsInput,
} from '@/server/notification-settings/types';
import { updateNotificationSettings } from '@/server/notification-settings/update-notification-settings';
import { NotificationSettingsActionOperation } from '@/server/notification-settings/actions/action-operation';
import { withActionEvent } from '@/server/common/logging/with-action-event';

export async function getNotificationSettingsAction(
  args: NotificationSettingsIdInput,
): Promise<NotificationSettings> {
  return withActionEvent(
    NotificationSettingsActionOperation.getNotificationSettings,
    () => getNotificationSettings(args),
  );
}

export async function updateNotificationSettingsAction(
  args: UpdateNotificationSettingsInput,
): Promise<ActionResult<NotificationSettings>> {
  return withActionEvent(
    NotificationSettingsActionOperation.updateNotificationSettings,
    () => runAction(() => updateNotificationSettings(args)),
  );
}
