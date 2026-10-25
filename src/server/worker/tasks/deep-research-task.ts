import 'server-only';

import { EventOutcome } from '@/lib/logging/constants';
import { addEventFields } from '@/server/common/logging/event-fields';
import { DEEP_RESEARCH_INTERVAL_MS } from '@/server/insights/constants/insight-limits';
import { runWeeklyDeepResearch } from '@/server/insights/deep-research/run-weekly-deep-research';
import type { WorkerTask } from '@/server/worker/types';

export const deepResearchTask: WorkerTask = {
  name: 'deep-research-weekly',
  intervalMs: DEEP_RESEARCH_INTERVAL_MS,
  run: async () => {
    const { reports } = await runWeeklyDeepResearch();
    if (reports === 0) {
      addEventFields({ outcome: EventOutcome.skipped });
      return;
    }
    addEventFields({ worker: { reports_written: reports } });
  },
};
