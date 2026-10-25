import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { ObservabilityNotificationKind } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { UrlGenerator } from '@/lib/url-generator/url-generator';
import { EmailNotificationKind } from '@/server/email/constants/email-notification-kind';
import {
  MILLISECONDS_PER_SECOND,
  NO_CALLS_PERIOD_SECONDS,
  SECONDS_PER_MINUTE,
} from '@/server/observability-notifications/constants';
import { notifyProject } from '@/server/observability-notifications/utils/notify-project';

const periodText = () => {
  const minutes = NO_CALLS_PERIOD_SECONDS / SECONDS_PER_MINUTE;
  if (minutes % SECONDS_PER_MINUTE === 0) {
    return `${minutes / SECONDS_PER_MINUTE} hour(s)`;
  }
  return `${minutes} minute(s)`;
};

const alreadyNotified = (
  lastNotice: { sentAt: Date } | null,
  lastCall: { createdAt: Date } | null,
) => {
  if (!lastNotice) return false;
  if (!lastCall) return true;
  return lastNotice.sentAt >= lastCall.createdAt;
};

const checkProject = async (
  project: { id: number; name: string },
  now: Date,
) => {
  const periodStart = new Date(
    now.getTime() - NO_CALLS_PERIOD_SECONDS * MILLISECONDS_PER_SECOND,
  );
  const lastCall = await prisma.callLog.findFirst({
    where: { projectId: project.id },
    orderBy: { createdAt: Prisma.SortOrder.desc },
    select: { createdAt: true },
  });
  if (lastCall && lastCall.createdAt >= periodStart) return false;
  const lastNotice = await prisma.observabilityNotificationLog.findFirst({
    where: {
      projectId: project.id,
      kind: ObservabilityNotificationKind.no_calls,
    },
    orderBy: { sentAt: Prisma.SortOrder.desc },
    select: { sentAt: true },
  });
  if (alreadyNotified(lastNotice, lastCall)) return false;
  await notifyProject({
    projectId: project.id,
    kind: ObservabilityNotificationKind.no_calls,
    emailKind: EmailNotificationKind.noCalls,
    title: `No calls received: ${project.name}`,
    body: `The project "${project.name}" received no calls in the last ${periodText()}.`,
    deepLink: UrlGenerator.calls({ projectId: project.id }),
  });
  return true;
};

export const checkNoCalls = async (now: Date = new Date()) => {
  const projects = await prisma.project.findMany({
    where: { notifyNoCalls: true },
    select: { id: true, name: true },
  });
  let sent = 0;
  for (const project of projects) {
    if (await checkProject(project, now)) sent += 1;
  }
  return { sent };
};
