import Link from 'next/link';

import { UrlGenerator } from '@/lib/url-generator/url-generator';

import { NOTIFICATION_NOTE } from '../_constants/monitor-dialog-text';

export function NotificationNote() {
  return (
    <p className="text-xs text-muted-foreground">
      {NOTIFICATION_NOTE}{' '}
      <Link
        href={UrlGenerator.settingsProjectIntegrations()}
        className="text-primary underline underline-offset-4"
      >
        Manage notifications
      </Link>
    </p>
  );
}
