import 'server-only';

import { EventOutcome } from '@/lib/logging/constants';
import { addEventFields } from '@/server/common/logging/event-fields';
import { INSIGHT_TRIAGE_INTERVAL_MS } from '@/server/insights/constants/insight-limits';
import { triageNewFailures } from '@/server/insights/generation/triage-new-failures';
import type { WorkerTask } from '@/server/worker/types';

export const insightTriageTask: WorkerTask = {
  name: 'insight-triage',
  intervalMs: INSIGHT_TRIAGE_INTERVAL_MS,
  run: async () => {
    const { triaged } = await triageNewFailures();
    if (triaged === 0) {
      addEventFields({ outcome: EventOutcome.skipped });
      return;
    }
    addEventFields({ worker: { failures_triaged: triaged } });
  },
};
