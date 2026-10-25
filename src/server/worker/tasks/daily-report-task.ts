import 'server-only';

import { EventOutcome } from '@/lib/logging/constants';
import { addEventFields } from '@/server/common/logging/event-fields';
import {
  DAILY_REPORT_TASK_INTERVAL_MS,
  DailyReportOutcome,
} from '@/server/daily-report/constants';
import { sendDueDailyReports } from '@/server/daily-report/send-due-daily-reports';
import type { WorkerTask } from '@/server/worker/types';

export const dailyReportTask: WorkerTask = {
  name: 'daily-report',
  intervalMs: DAILY_REPORT_TASK_INTERVAL_MS,
  run: async () => {
    const results = await sendDueDailyReports();
    const sent = results.filter(
      (result) => result.outcome === DailyReportOutcome.sent,
    ).length;
    if (sent === 0) {
      addEventFields({ outcome: EventOutcome.skipped });
      return;
    }
    addEventFields({ worker: { reports_sent: sent } });
  },
};
