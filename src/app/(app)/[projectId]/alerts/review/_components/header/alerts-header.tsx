import { PageHeader } from '@/components/common/page-header/page-header';

import { AlertWindowToggle } from './alert-window-toggle';
import { NewAlertButton } from './new-alert-button';
import { RefreshAlertsButton } from './refresh-alerts-button';

export function AlertsHeader() {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3">
      <PageHeader
        title="Alerts"
        description="See which alerts fired, when, and why. Configure new ones below."
      />
      <div className="flex items-center gap-2">
        <AlertWindowToggle />
        <RefreshAlertsButton />
        <NewAlertButton />
      </div>
    </div>
  );
}
