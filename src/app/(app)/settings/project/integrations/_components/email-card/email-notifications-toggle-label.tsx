'use client';

import { useIsEmailEnabled } from '../../_hooks/use-is-email-enabled';

export function EmailNotificationsToggleLabel() {
  const isEmailEnabled = useIsEmailEnabled();

  if (isEmailEnabled) return 'Disable Notifications';
  return 'Enable Notifications';
}
