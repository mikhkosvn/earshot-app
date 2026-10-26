import 'server-only';

import { EventOutcome } from '@/lib/logging/constants';
import { addEventFields } from '@/server/common/logging/event-fields';
import { checkFrequentCalls } from '@/server/observability-notifications/check-frequent-calls';
import { checkNoCalls } from '@/server/observability-notifications/check-no-calls';
import { OBSERVABILITY_NOTIFICATION_INTERVAL_MS } from '@/server/observability-notifications/constants';
import type { WorkerTask } from '@/server/worker/types';

export const observabilityNotificationsTask: WorkerTask = {
  name: 'observability-notifications',
  intervalMs: OBSERVABILITY_NOTIFICATION_INTERVAL_MS,
  run: async () => {
    const noCalls = await checkNoCalls();
    const frequentCalls = await checkFrequentCalls();
    const sent = noCalls.sent + frequentCalls.sent;
    if (sent === 0) {
      addEventFields({ outcome: EventOutcome.skipped });
      return;
    }
    addEventFields({
      worker: {
        notifications_sent: sent,
        no_calls_sent: noCalls.sent,
        frequent_calls_sent: frequentCalls.sent,
      },
    });
  },
};
