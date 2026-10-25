import 'server-only';

import {
  NotificationEventType,
  NotificationSeverity,
  type ObservabilityNotificationKind,
} from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import type { EmailNotificationKind } from '@/server/email/constants/email-notification-kind';
import { notifyProjectMembersByEmail } from '@/server/email/notify-project-members-by-email';
import { appUrl } from '@/server/runs/utils/app-url';

type NotifyProjectArgs = {
  projectId: number;
  kind: ObservabilityNotificationKind;
  emailKind: EmailNotificationKind;
  title: string;
  body: string;
  deepLink: string;
  customerNumber?: string;
  callCount?: number;
};

const settle = async (label: string, task: () => Promise<unknown>) => {
  try {
    await task();
  } catch (error) {
    console.error(`[observability] The ${label} failed.`, error);
  }
};

export const notifyProject = async ({
  projectId,
  kind,
  emailKind,
  title,
  body,
  deepLink,
  customerNumber,
  callCount,
}: NotifyProjectArgs) => {
  await prisma.observabilityNotificationLog.create({
    data: {
      projectId,
      kind,
      customerNumber: customerNumber ?? null,
      callCount: callCount ?? 0,
    },
  });
  await settle('notification', async () => {
    const members = await prisma.organizationMember.findMany({
      where: { organization: { projects: { some: { id: projectId } } } },
      select: { userId: true },
    });
    await prisma.notification.createMany({
      data: members.map((member) => ({
        userId: member.userId,
        projectId,
        eventType: NotificationEventType.alert_triggered,
        severity: NotificationSeverity.warning,
        title,
        body,
        deepLink,
      })),
    });
  });
  await settle('email', () =>
    notifyProjectMembersByEmail({
      projectId,
      kind: emailKind,
      subject: title,
      body: [body, `Open the calls: ${appUrl(deepLink)}`].join('\n\n'),
    }),
  );
};
