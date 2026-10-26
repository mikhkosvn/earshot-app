import 'server-only';

import { prisma } from '@/lib/prisma';
import { recordStepFailure } from '@/server/common/logging/event-fields';
import { EmailStep } from '@/server/email/constants/email-operation';
import { EmailSkipReason } from '@/server/email/constants/email-notification-kind';
import { sendEmail } from '@/server/email/send-email';
import type {
  NotifyProjectMembersInput,
  NotifyProjectMembersResult,
} from '@/server/email/types';
import { isEmailKindEnabled } from '@/server/email/utils/is-email-kind-enabled';
import { recordEmailTotals } from '@/server/email/utils/record-email-totals';
import { textToHtml } from '@/server/email/utils/text-to-html';
import { notificationSettingsSelect } from '@/server/notification-settings/constants/notification-settings-select';

const skipped = (skipReason: EmailSkipReason): NotifyProjectMembersResult => {
  recordEmailTotals({ skipped_count: 1 });
  return { sent: false, skipReason };
};

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
    return skipped(EmailSkipReason.emailDisabled);
  }
  if (!isEmailKindEnabled(project, kind)) {
    return skipped(EmailSkipReason.kindDisabled);
  }
  const recipients = project.organization.members.map(
    (member) => member.user.email,
  );
  if (recipients.length === 0) {
    return skipped(EmailSkipReason.noRecipients);
  }
  const html = textToHtml(body);
  const results = await Promise.allSettled(
    recipients.map((to) => sendEmail({ to, subject, html, text: body })),
  );
  const failedRecipients = recipients.filter(
    (_, index) => results[index].status === 'rejected',
  );
  for (const result of results) {
    if (result.status === 'rejected') {
      recordStepFailure(EmailStep.send, result.reason);
    }
  }
  recordEmailTotals({
    sent_count: recipients.length - failedRecipients.length,
    failed_count: failedRecipients.length,
  });
  return {
    sent: true,
    recipients: recipients.filter((to) => !failedRecipients.includes(to)),
    failedRecipients,
  };
};
