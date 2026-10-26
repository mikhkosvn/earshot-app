import 'server-only';

import { WebhookNotification } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import {
  addEventFields,
  recordStepFailure,
} from '@/server/common/logging/event-fields';
import {
  DAILY_REPORT_HOUR,
  DAILY_REPORT_WINDOW_MS,
  DailyReportOutcome,
  DailyReportStep,
} from '@/server/daily-report/constants';
import { sendDailyReport } from '@/server/daily-report/send-daily-report';
import type { DailyReportDeliveryResult } from '@/server/daily-report/types';
import { projectTimeZone } from '@/server/dashboards/utils/time/project-time-zone';
import {
  zonedDateKey,
  zonedParts,
  zonedToUtc,
} from '@/server/dashboards/utils/time/zoned-time';

const projectSelect = {
  id: true,
  name: true,
  timezone: true,
  emailNotificationsEnabled: true,
  notifyDailyReport: true,
  notifyDailyReportNoCalls: true,
  dailyReportAiSummaryEnabled: true,
  webhook: {
    select: {
      url: true,
      notifications: {
        where: { notification: WebhookNotification.daily_report },
        select: { notification: true },
      },
    },
  },
} as const;

type ReportProject = Awaited<
  ReturnType<typeof prisma.project.findMany<{ select: typeof projectSelect }>>
>[number];

const hasEmailChannel = (project: ReportProject) =>
  project.emailNotificationsEnabled &&
  (project.notifyDailyReport || project.notifyDailyReportNoCalls);

const hasWebhookChannel = (project: ReportProject) =>
  Boolean(project.webhook?.url) &&
  (project.webhook?.notifications.length ?? 0) > 0;

const reportDateValue = (reportDate: string) =>
  new Date(`${reportDate}T00:00:00.000Z`);

const resultOf = (
  projectId: number,
  reportDate: string,
  outcome: DailyReportOutcome,
): DailyReportDeliveryResult => ({
  projectId,
  reportDate,
  outcome,
  email: null,
  webhook: null,
});

const claimReportDay = async (projectId: number, reportDate: string) => {
  const claim = await prisma.dailyReportDelivery.createMany({
    data: [{ projectId, reportDate: reportDateValue(reportDate) }],
    skipDuplicates: true,
  });
  return claim.count > 0;
};

const releaseReportDay = (projectId: number, reportDate: string) =>
  prisma.dailyReportDelivery.deleteMany({
    where: { projectId, reportDate: reportDateValue(reportDate) },
  });

const deliverProjectReport = async (
  project: ReportProject,
  now: Date,
): Promise<DailyReportDeliveryResult> => {
  const timeZone = projectTimeZone(project.timezone);
  const parts = zonedParts(now, timeZone);
  const reportDate = zonedDateKey(now, timeZone);
  if (parts.hour < DAILY_REPORT_HOUR) {
    return resultOf(project.id, reportDate, DailyReportOutcome.notDue);
  }
  if (!hasEmailChannel(project) && !hasWebhookChannel(project)) {
    return resultOf(project.id, reportDate, DailyReportOutcome.notDue);
  }
  if (!(await claimReportDay(project.id, reportDate))) {
    return resultOf(project.id, reportDate, DailyReportOutcome.alreadySent);
  }
  const windowEnd = zonedToUtc(
    { ...parts, hour: DAILY_REPORT_HOUR, minute: 0, second: 0 },
    timeZone,
  );
  try {
    const delivery = await sendDailyReport({
      projectId: project.id,
      projectName: project.name,
      reportDate,
      timeZone,
      windowStart: new Date(windowEnd.getTime() - DAILY_REPORT_WINDOW_MS),
      windowEnd,
      aiSummaryEnabled: project.dailyReportAiSummaryEnabled,
    });
    return {
      ...resultOf(project.id, reportDate, DailyReportOutcome.sent),
      ...delivery,
    };
  } catch (error) {
    await releaseReportDay(project.id, reportDate);
    throw error;
  }
};

const projectScope = (projectIds: number[] | undefined) => {
  if (!projectIds) return {};
  return { id: { in: projectIds } };
};

const countOutcome = (
  results: DailyReportDeliveryResult[],
  outcome: DailyReportOutcome,
) => results.filter((result) => result.outcome === outcome).length;

export const sendDueDailyReports = async (
  now: Date = new Date(),
  projectIds?: number[],
) => {
  const projects = await prisma.project.findMany({
    where: projectScope(projectIds),
    select: projectSelect,
  });
  const results: DailyReportDeliveryResult[] = [];
  for (const project of projects) {
    try {
      results.push(await deliverProjectReport(project, now));
    } catch (error) {
      recordStepFailure(DailyReportStep.project_delivery, error);
    }
  }
  addEventFields({
    daily_report: {
      project_count: projects.length,
      sent_count: countOutcome(results, DailyReportOutcome.sent),
      already_sent_count: countOutcome(results, DailyReportOutcome.alreadySent),
      not_due_count: countOutcome(results, DailyReportOutcome.notDue),
      failed_count: projects.length - results.length,
    },
  });
  return results;
};
