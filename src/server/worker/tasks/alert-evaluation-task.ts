import 'server-only';

import { EventOutcome } from '@/lib/logging/constants';
import { ALERT_EVALUATION_INTERVAL_MS } from '@/server/alerts/constants/alert-limits';
import { evaluateInsightAlerts } from '@/server/alerts/evaluation/evaluate-insight-alerts';
import { evaluateNewEvaluations } from '@/server/alerts/evaluation/evaluate-new-evaluations';
import { addEventFields } from '@/server/common/logging/event-fields';
import type { WorkerTask } from '@/server/worker/types';

export const alertEvaluationTask: WorkerTask = {
  name: 'alert-evaluation',
  intervalMs: ALERT_EVALUATION_INTERVAL_MS,
  run: async () => {
    const evaluations = await evaluateNewEvaluations();
    const insights = await evaluateInsightAlerts();
    const fired = evaluations.fired + insights.fired;
    if (fired === 0) {
      addEventFields({ outcome: EventOutcome.skipped });
      return;
    }
    addEventFields({
      worker: {
        alerts_fired: fired,
        evaluation_alerts_fired: evaluations.fired,
        insight_alerts_fired: insights.fired,
      },
    });
  },
};
