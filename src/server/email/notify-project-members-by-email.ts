import 'server-only';

import { prisma } from '@/lib/prisma';
import { EmailSkipReason } from '@/server/email/constants/email-notification-kind';
import { sendEmail } from '@/server/email/send-email';
import type {
  NotifyProjectMembersInput,
  NotifyProjectMembersResult,
} from '@/server/email/types';
import { isEmailKindEnabled } from '@/server/email/utils/is-email-kind-enabled';
import { textToHtml } from '@/server/email/utils/text-to-html';
import { notificationSettingsSelect } from '@/server/notification-settings/constants/notification-settings-select';

export const notifyProjectMembersByEmail = async ({
  projectId,
  kind,
  subject,
  body,
}: NotifyProjectMembersInput): Promise<NotifyProjectMembersResult> => {
  const project = await prisma.project.findUniqueOrThrow({
    where: { id: projectId },
    select: {
      ...notificationSettingsSelect,
      organization: {
        select: { members: { select: { user: { select: { email: true } } } } },
      },
    },
  });
  if (!project.emailNotificationsEnabled) {
    return { sent: false, skipReason: EmailSkipReason.emailDisabled };
  }
  if (!isEmailKindEnabled(project, kind)) {
    return { sent: false, skipReason: EmailSkipReason.kindDisabled };
  }
  const recipients = project.organization.members.map(
    (member) => member.user.email,
  );
  if (recipients.length === 0) {
    return { sent: false, skipReason: EmailSkipReason.noRecipients };
  }
  const html = textToHtml(body);
  const results = await Promise.allSettled(
    recipients.map((to) => sendEmail({ to, subject, html, text: body })),
  );
  const failedRecipients = recipients.filter(
    (_, index) => results[index].status === 'rejected',
  );
  if (failedRecipients.length > 0) {
    console.error(
      `[email] ${failedRecipients.length} of ${recipients.length} emails for project ${projectId} were not sent.`,
      results.flatMap((result) => {
        if (result.status === 'rejected') return [String(result.reason)];
        return [];
      }),
    );
  }
  return {
    sent: true,
    recipients: recipients.filter((to) => !failedRecipients.includes(to)),
    failedRecipients,
  };
};
