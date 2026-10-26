import 'server-only';

import { ObservabilityNotificationKind } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { UrlGenerator } from '@/lib/url-generator/url-generator';
import { addEventFields } from '@/server/common/logging/event-fields';
import { EmailNotificationKind } from '@/server/email/constants/email-notification-kind';
import {
  MILLISECONDS_PER_SECOND,
  SECONDS_PER_MINUTE,
} from '@/server/observability-notifications/constants';
import { notifyProject } from '@/server/observability-notifications/utils/notify-project';

interface FrequentCallsProject {
  id: number;
  name: string;
  frequentCallsThreshold: number;
  frequentCallsWindowSeconds: number;
  frequentCallsCooldownSeconds: number;
}

const secondsAgo = (now: Date, seconds: number) =>
  new Date(now.getTime() - seconds * MILLISECONDS_PER_SECOND);

const minutesText = (seconds: number) =>
  `${Math.round(seconds / SECONDS_PER_MINUTE)} minute(s)`;

const checkProject = async (project: FrequentCallsProject, now: Date) => {
  const groups = await prisma.callLog.groupBy({
    by: ['customerNumber'],
    where: {
      projectId: project.id,
      customerNumber: { not: null },
      createdAt: {
        gte: secondsAgo(now, project.frequentCallsWindowSeconds),
      },
    },
    _count: { _all: true },
  });
  let sent = 0;
  for (const group of groups) {
    const customerNumber = group.customerNumber;
    const count = group._count._all;
    if (!customerNumber || count <= project.frequentCallsThreshold) continue;
    const recent = await prisma.observabilityNotificationLog.findFirst({
      where: {
        projectId: project.id,
        kind: ObservabilityNotificationKind.frequent_calls,
        customerNumber,
        sentAt: { gte: secondsAgo(now, project.frequentCallsCooldownSeconds) },
      },
      select: { id: true },
    });
    if (recent) continue;
    await notifyProject({
      projectId: project.id,
      kind: ObservabilityNotificationKind.frequent_calls,
      emailKind: EmailNotificationKind.frequentCalls,
      title: `Frequent calls from ${customerNumber}`,
      body: `The number ${customerNumber} called the project "${project.name}" ${count} times in the last ${minutesText(project.frequentCallsWindowSeconds)}. The limit is ${project.frequentCallsThreshold}.`,
      deepLink: UrlGenerator.calls({
        projectId: project.id,
        values: { search: customerNumber },
      }),
      customerNumber,
      callCount: count,
    });
    sent += 1;
  }
  return sent;
};

export const checkFrequentCalls = async (now: Date = new Date()) => {
  const projects = await prisma.project.findMany({
    where: { notifyFrequentCalls: true },
    select: {
      id: true,
      name: true,
      frequentCallsThreshold: true,
      frequentCallsWindowSeconds: true,
      frequentCallsCooldownSeconds: true,
    },
  });
  let sent = 0;
  for (const project of projects) sent += await checkProject(project, now);
  addEventFields({
    frequent_calls: { project_count: projects.length, sent_count: sent },
  });
  return { sent };
};
