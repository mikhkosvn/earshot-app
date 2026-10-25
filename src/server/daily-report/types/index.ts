import type { NotifyProjectMembersResult } from '@/server/email/types';
import type { SendProjectWebhookResult } from '@/server/project-webhooks/types';

import type { DailyReportOutcome } from '../constants';

export interface ReportTotals {
  count: number;
  successRatio: number | null;
  totalSeconds: number;
  medianLatency: number | null;
}

export interface ReportPlotLine {
  name: string;
  summary: string;
}

export interface ReportDashboard {
  id: number;
  name: string;
  plots: ReportPlotLine[];
}

export interface DailyReport {
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
}

export interface DailyReportDeliveryResult {
  projectId: number;
  reportDate: string;
  outcome: DailyReportOutcome;
  email: NotifyProjectMembersResult | null;
  webhook: SendProjectWebhookResult | null;
}
