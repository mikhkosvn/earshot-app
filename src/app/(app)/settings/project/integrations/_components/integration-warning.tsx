'use client';

import { CircleAlertIcon } from 'lucide-react';

import { useIsEmailEnabled } from '../_hooks/use-is-email-enabled';

export function IntegrationWarning() {
  const isEmailEnabled = useIsEmailEnabled();
  if (isEmailEnabled) return null;

  return (
    <div className="flex items-center gap-2 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2.5 text-xs text-amber-900 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-100">
      <CircleAlertIcon className="size-3.5 shrink-0" />
      Please enable relevant integration to receive these notifications.
    </div>
  );
}
