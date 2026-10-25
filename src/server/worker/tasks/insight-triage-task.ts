import 'server-only';

import { INSIGHT_TRIAGE_INTERVAL_MS } from '@/server/insights/constants/insight-limits';
import { triageNewFailures } from '@/server/insights/generation/triage-new-failures';
import type { WorkerTask } from '@/server/worker/types';

export const insightTriageTask: WorkerTask = {
  name: 'insight-triage',
  intervalMs: INSIGHT_TRIAGE_INTERVAL_MS,
  run: async () => {
    const { triaged } = await triageNewFailures();
    if (triaged > 0) console.info(`[worker] Triaged ${triaged} failure(s).`);
  },
};
