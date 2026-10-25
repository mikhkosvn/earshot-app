import type { NotifyProjectMembersResult } from '@/server/email/types';
import type { SendProjectWebhookResult } from '@/server/project-webhooks/types';

import type { DailyReportOutcome } from '../constants';

export type ReportTotals = {
  count: number;
  successRatio: number | null;
  totalSeconds: number;
  medianLatency: number | null;
};

export type ReportPlotLine = {
  name: string;
  summary: string;
};

export type ReportDashboard = {
  id: number;
  name: string;
  plots: ReportPlotLine[];
};

export type DailyReport = {
  projectId: number;
  projectName: string;
  reportDate: string;
  timeZone: string;
  windowStart: Date;
  windowEnd: Date;
  calls: ReportTotals;
  runs: ReportTotals;
  dashboards: ReportDashboard[];
  aiSummary: string | null;
};

export type DailyReportDeliveryResult = {
  projectId: number;
  reportDate: string;
  outcome: DailyReportOutcome;
  email: NotifyProjectMembersResult | null;
  webhook: SendProjectWebhookResult | null;
};
