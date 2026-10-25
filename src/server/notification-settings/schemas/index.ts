import { z } from 'zod';

const idSchema = z.number().int().positive();

export const notificationSettingsSchema = z.object({
  emailNotificationsEnabled: z.boolean(),
  notifyMonitorFailure: z.boolean(),
  notifyMonitorSuccess: z.boolean(),
  notifyResultsCompletion: z.boolean(),
  notifyDailyReport: z.boolean(),
  notifyDailyReportNoCalls: z.boolean(),
  dailyReportAiSummaryEnabled: z.boolean(),
  notifyNoCalls: z.boolean(),
  notifyFrequentCalls: z.boolean(),
});

export const notificationSettingsIdSchema = z.object({
  projectId: idSchema,
});

export const updateNotificationSettingsSchema =
  notificationSettingsSchema.extend({ projectId: idSchema });
