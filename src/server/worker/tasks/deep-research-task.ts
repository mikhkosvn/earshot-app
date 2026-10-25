import 'server-only';

import { DEEP_RESEARCH_INTERVAL_MS } from '@/server/insights/constants/insight-limits';
import { runWeeklyDeepResearch } from '@/server/insights/deep-research/run-weekly-deep-research';
import type { WorkerTask } from '@/server/worker/types';

export const deepResearchTask: WorkerTask = {
  name: 'deep-research-weekly',
  intervalMs: DEEP_RESEARCH_INTERVAL_MS,
  run: async () => {
    const { reports } = await runWeeklyDeepResearch();
    if (reports > 0) {
      console.info(`[worker] Wrote ${reports} weekly Deep Research report(s).`);
    }
  },
};
