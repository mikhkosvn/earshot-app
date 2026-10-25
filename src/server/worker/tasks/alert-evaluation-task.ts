import 'server-only';

import { ALERT_EVALUATION_INTERVAL_MS } from '@/server/alerts/constants/alert-limits';
import { evaluateInsightAlerts } from '@/server/alerts/evaluation/evaluate-insight-alerts';
import { evaluateNewEvaluations } from '@/server/alerts/evaluation/evaluate-new-evaluations';
import type { WorkerTask } from '@/server/worker/types';

export const alertEvaluationTask: WorkerTask = {
  name: 'alert-evaluation',
  intervalMs: ALERT_EVALUATION_INTERVAL_MS,
  run: async () => {
    const evaluations = await evaluateNewEvaluations();
    const insights = await evaluateInsightAlerts();
    const fired = evaluations.fired + insights.fired;
    if (fired > 0) console.info(`[worker] ${fired} alert(s) fired.`);
  },
};
