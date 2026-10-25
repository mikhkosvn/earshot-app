import 'server-only';

import { WebhookNotification } from '@/generated/prisma/enums';
import type { DailyReport } from '@/server/daily-report/types';
import { buildDailyReport } from '@/server/daily-report/utils/build-daily-report';
import { dailyReportAiSummary } from '@/server/daily-report/utils/daily-report-ai-summary';
import {
  dailyReportBody,
  dailyReportPayload,
  dailyReportSubject,
} from '@/server/daily-report/utils/format-daily-report';
import { EmailNotificationKind } from '@/server/email/constants/email-notification-kind';
import { notifyProjectMembersByEmail } from '@/server/email/notify-project-members-by-email';
import { WebhookEvent } from '@/server/project-webhooks/constants/webhook-event';
import { sendProjectWebhook } from '@/server/project-webhooks/send-project-webhook';

interface SendDailyReportInput {
  projectId: number;
  projectName: string;
  reportDate: string;
  timeZone: string;
  windowStart: Date;
  windowEnd: Date;
  aiSummaryEnabled: boolean;
}

const emailKindOf = (report: DailyReport) => {
  if (report.calls.count === 0) return EmailNotificationKind.dailyReportNoCalls;
  return EmailNotificationKind.dailyReport;
};

const withAiSummary = async (report: DailyReport, enabled: boolean) => {
  if (!enabled) return report;
  return { ...report, aiSummary: await dailyReportAiSummary(report) };
};

export const sendDailyReport = async ({
  aiSummaryEnabled,
  ...window
}: SendDailyReportInput) => {
  const report = await withAiSummary(
    await buildDailyReport(window),
    aiSummaryEnabled,
  );
  const [email, webhook] = await Promise.all([
    notifyProjectMembersByEmail({
      projectId: report.projectId,
      kind: emailKindOf(report),
      subject: dailyReportSubject(report),
      body: dailyReportBody(report),
    }),
    sendProjectWebhook({
      projectId: report.projectId,
      event: WebhookEvent.dailyReport,
      notification: WebhookNotification.daily_report,
      payload: dailyReportPayload(report),
      idempotencyKey: `daily-report-${report.projectId}-${report.reportDate}`,
    }),
  ]);
  return { email, webhook };
};
