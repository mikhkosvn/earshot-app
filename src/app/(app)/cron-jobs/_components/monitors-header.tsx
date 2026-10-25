import Link from 'next/link';

import { PageHeader } from '@/components/common/page-header/page-header';
import { MONITOR_DIALOG_SUBTITLE } from '@/components/common/monitor-dialog/_constants/monitor-dialog-text';
import { UrlGenerator } from '@/lib/url-generator/url-generator';

import { CreateMonitorButton } from './create-monitor-button';

export function MonitorsHeader() {
  return (
    <div className="flex items-start justify-between gap-3">
      <PageHeader
        title="Synthetic Monitors"
        description={
          <>
            {MONITOR_DIALOG_SUBTITLE}
            <br />
            Notifications for these runs go to email and webhooks.{' '}
            <Link
              href={UrlGenerator.settingsProjectIntegrations()}
              className="text-primary underline underline-offset-4"
            >
              Configure
            </Link>
          </>
        }
      />
      <CreateMonitorButton />
    </div>
  );
}
