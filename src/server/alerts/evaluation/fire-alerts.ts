import 'server-only';

import {
  NotificationEventType,
  NotificationSeverity,
} from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { UrlGenerator } from '@/lib/url-generator/url-generator';
import { AlertStep } from '@/server/alerts/constants/alert-step';
import { recordStepFailure } from '@/server/common/logging/event-fields';
import { EmailNotificationKind } from '@/server/email/constants/email-notification-kind';
import { notifyProjectMembersByEmail } from '@/server/email/notify-project-members-by-email';
import { appUrl } from '@/server/runs/utils/app-url';

export interface AlertFire {
  rule: { id: number; name: string; projectId: number };
  message: string;
  observedValue: number | null;
  conversationId: number | null;
  metricEvaluationId: number | null;
  failureCategoryId: number | null;
}

const EMAIL_MESSAGES_MAX = 5;

export const recordAlertFire = async (fire: AlertFire) => {
  if (fire.metricEvaluationId !== null) {
    const existing = await prisma.alertTrigger.findFirst({
      where: {
        alertRuleId: fire.rule.id,
        metricEvaluationId: fire.metricEvaluationId,
      },
      select: { id: true },
    });
    if (existing) return false;
  }
  await prisma.alertTrigger.create({
    data: {
      alertRuleId: fire.rule.id,
      conversationId: fire.conversationId,
      metricEvaluationId: fire.metricEvaluationId,
      failureCategoryId: fire.failureCategoryId,
      observedValue: fire.observedValue,
      message: fire.message,
    },
  });
  return true;
};

const groupByRule = (fires: AlertFire[]) => {
  const groups = new Map<number, AlertFire[]>();
  fires.forEach((fire) => {
    const list = groups.get(fire.rule.id) ?? [];
    list.push(fire);
    groups.set(fire.rule.id, list);
  });
  return [...groups.values()];
};

const bodyOf = (fires: AlertFire[]) => {
  const [first] = fires;
  if (fires.length === 1) return first.message;
  return `${first.message} The alert fired ${fires.length} times.`;
};

const projectMemberIds = async (projectId: number) => {
  const members = await prisma.organizationMember.findMany({
    where: { organization: { projects: { some: { id: projectId } } } },
    select: { userId: true },
  });
  return members.map((member) => member.userId);
};

const settle = async (step: AlertStep, task: () => Promise<unknown>) => {
  try {
    await task();
  } catch (error) {
    recordStepFailure(step, error);
  }
};

const notifyRule = async (fires: AlertFire[]) => {
  const { rule } = fires[0];
  const deepLink = UrlGenerator.alerts({ projectId: rule.projectId });
  const title = `Alert fired: ${rule.name}`;
  const body = bodyOf(fires);
  await settle(AlertStep.fire_notification, async () => {
    const userIds = await projectMemberIds(rule.projectId);
    await prisma.notification.createMany({
      data: userIds.map((userId) => ({
        userId,
        projectId: rule.projectId,
        eventType: NotificationEventType.alert_triggered,
        severity: NotificationSeverity.warning,
        title,
        body,
        deepLink,
      })),
    });
  });
  await settle(AlertStep.fire_email, () =>
    notifyProjectMembersByEmail({
      projectId: rule.projectId,
      kind: EmailNotificationKind.alert,
      subject: title,
      body: [
        `The alert "${rule.name}" fired ${fires.length} time(s).`,
        ...fires.slice(0, EMAIL_MESSAGES_MAX).map((fire) => fire.message),
        `Open the alerts: ${appUrl(deepLink)}`,
      ].join('\n\n'),
    }),
  );
};

export const notifyAlertFires = async (fires: AlertFire[]) => {
  for (const group of groupByRule(fires)) {
    await notifyRule(group);
  }
};
