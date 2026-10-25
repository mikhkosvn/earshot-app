'use client';

import { Badge } from '@/components/ui/badge';

import { useIsEmailEnabled } from '../../_hooks/use-is-email-enabled';

export function EmailNotificationsStatus() {
  const isEmailEnabled = useIsEmailEnabled();
  if (!isEmailEnabled) return null;

  return (
    <Badge variant="secondary" className="w-fit">
      Email notifications are on
    </Badge>
  );
}
