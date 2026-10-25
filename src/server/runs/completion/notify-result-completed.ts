import 'server-only';

import { NotificationEventType, RunStatus } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { UrlGenerator } from '@/lib/url-generator/url-generator';
import { EmailNotificationKind } from '@/server/email/constants/email-notification-kind';
import { notifyProjectMembersByEmail } from '@/server/email/notify-project-members-by-email';
import { WebhookEvent } from '@/server/project-webhooks/constants/webhook-event';
import { sendProjectWebhook } from '@/server/project-webhooks/send-project-webhook';
import {
  MONITOR_WEBHOOK_NOTIFICATION,
  RESULT_NOTIFICATION_SEVERITY,
  RESULT_WEBHOOK_NOTIFICATION,
  ResultOutcome,
} from '@/server/runs/constants/result-outcome';
import { appUrl } from '@/server/runs/utils/app-url';
import { buildResultCompletedPayload } from '@/server/runs/webhooks/build-result-completed-payload';

interface Counts {
  total: number;
  success: number;
  failed: number;
}

const outcomeOf = (status: RunStatus, counts: Counts) => {
  if (status === RunStatus.failed) return ResultOutcome.error;
  if (counts.failed > 0) return ResultOutcome.failure;
  return ResultOutcome.success;
};

const webhookNotificationOf = (isMonitor: boolean, outcome: ResultOutcome) => {
  if (isMonitor) return MONITOR_WEBHOOK_NOTIFICATION[outcome];
  return RESULT_WEBHOOK_NOTIFICATION[outcome];
};

const labelOf = (result: { id: number; name: string }) => {
  if (result.name.trim()) return `${result.name} (${result.id})`;
  return `Result ${result.id}`;
};

const summaryOf = (counts: Counts) =>
  `${counts.success} of ${counts.total} runs passed.`;

const recipientIds = async (projectId: number, createdById: number | null) => {
  if (createdById !== null) return [createdById];
  const members = await prisma.organizationMember.findMany({
    where: { organization: { projects: { some: { id: projectId } } } },
    select: { userId: true },
  });
  return members.map((member) => member.userId);
};

const settle = async (label: string, task: () => Promise<unknown>) => {
  try {
    await task();
  } catch (error) {
    console.error(`[runs] The ${label} of a completed result failed.`, error);
  }
};

export const notifyResultCompleted = async (resultId: number) => {
  const { result, counts, payload } =
    await buildResultCompletedPayload(resultId);
  const meta = await prisma.result.findUniqueOrThrow({
    where: { id: resultId },
    select: { projectId: true, createdById: true },
  });
  const outcome = outcomeOf(result.status, counts);
  const label = labelOf(result);
  const deepLink = UrlGenerator.result({
    projectId: meta.projectId,
    resultId,
  });
  const summary = summaryOf(counts);

  await settle('webhook', () =>
    sendProjectWebhook({
      projectId: meta.projectId,
      event: WebhookEvent.resultCompleted,
      notification: webhookNotificationOf(result.monitorRun !== null, outcome),
      idempotencyKey: `${WebhookEvent.resultCompleted}:${resultId}`,
      payload,
    }),
  );
  await settle('email', () =>
    notifyProjectMembersByEmail({
      projectId: meta.projectId,
      kind: EmailNotificationKind.resultsCompletion,
      subject: `Results completed: ${label}`,
      body: [
        `The result ${label} is complete.`,
        summary,
        `Open the result: ${appUrl(deepLink)}`,
      ].join('\n\n'),
    }),
  );
  await settle('notification', async () => {
    const userIds = await recipientIds(meta.projectId, meta.createdById);
    await prisma.notification.createMany({
      data: userIds.map((userId) => ({
        userId,
        projectId: meta.projectId,
        eventType: NotificationEventType.run_completed,
        severity: RESULT_NOTIFICATION_SEVERITY[outcome],
        title: 'Run completed',
        body: `${label}: ${summary}`,
        deepLink,
      })),
    });
  });
};
