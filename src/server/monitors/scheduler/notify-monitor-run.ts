import 'server-only';

import { NotifyOn } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { UrlGenerator } from '@/lib/url-generator/url-generator';
import { MonitorRunOutcome } from '@/server/monitors/constants/monitor-run-outcome';
import { EmailNotificationKind } from '@/server/email/constants/email-notification-kind';
import { notifyProjectMembersByEmail } from '@/server/email/notify-project-members-by-email';
import { appUrl } from '@/server/runs/utils/app-url';

const NOTIFY_ON_OUTCOME: Record<MonitorRunOutcome, NotifyOn[]> = {
  [MonitorRunOutcome.success]: [NotifyOn.success, NotifyOn.both],
  [MonitorRunOutcome.failure]: [NotifyOn.failure, NotifyOn.both],
};

const EMAIL_KIND: Record<MonitorRunOutcome, EmailNotificationKind> = {
  [MonitorRunOutcome.success]: EmailNotificationKind.monitorSuccess,
  [MonitorRunOutcome.failure]: EmailNotificationKind.monitorFailure,
};

const SUBJECT_PREFIX: Record<MonitorRunOutcome, string> = {
  [MonitorRunOutcome.success]: 'Monitor passed',
  [MonitorRunOutcome.failure]: 'Monitor failed',
};

const resultLine = (projectId: number, resultId: number | null) => {
  if (resultId === null) return [];
  return [
    `Open the result: ${appUrl(UrlGenerator.result({ projectId, resultId }))}`,
  ];
};

interface NotifyMonitorRunArgs {
  monitorRunId: number;
  outcome: MonitorRunOutcome;
  detail: string;
}

export const notifyMonitorRun = async ({
  monitorRunId,
  outcome,
  detail,
}: NotifyMonitorRunArgs) => {
  const run = await prisma.monitorRun.findUniqueOrThrow({
    where: { id: monitorRunId },
    select: {
      resultId: true,
      monitor: { select: { name: true, projectId: true, notifyOn: true } },
    },
  });
  if (!NOTIFY_ON_OUTCOME[outcome].includes(run.monitor.notifyOn)) return;
  try {
    await notifyProjectMembersByEmail({
      projectId: run.monitor.projectId,
      kind: EMAIL_KIND[outcome],
      subject: `${SUBJECT_PREFIX[outcome]}: ${run.monitor.name}`,
      body: [
        `The monitor ${run.monitor.name} finished a scheduled run.`,
        detail,
        ...resultLine(run.monitor.projectId, run.resultId),
      ].join('\n\n'),
    });
  } catch (error) {
    console.error(
      `[monitors] The email for monitor run ${monitorRunId} was not sent.`,
      error,
    );
  }
};
