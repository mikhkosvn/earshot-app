import 'server-only';

import { DAILY_REPORT_TASK_INTERVAL_MS } from '@/server/daily-report/constants';
import { sendDueDailyReports } from '@/server/daily-report/send-due-daily-reports';
import type { WorkerTask } from '@/server/worker/types';

export const dailyReportTask: WorkerTask = {
  name: 'daily-report',
  intervalMs: DAILY_REPORT_TASK_INTERVAL_MS,
  run: async () => {
    await sendDueDailyReports();
  },
};
