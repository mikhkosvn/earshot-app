import 'server-only';

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
    if (sent > 0) {
      console.info(`[worker] Sent ${sent} observability notification(s).`);
    }
  },
};
