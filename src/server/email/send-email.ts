import 'server-only';

import { ExternalService } from '@/server/common/logging/constants';
import { recordExternalCall } from '@/server/common/logging/event-fields';
import { EmailOperation } from '@/server/email/constants/email-operation';
import { DEFAULT_EMAIL_FROM } from '@/server/email/constants/smtp-defaults';
import type { SendEmailInput, SentEmail } from '@/server/email/types';
import { getMailTransport } from '@/server/email/utils/get-mail-transport';
import { smtpError } from '@/server/email/utils/smtp-error';

const SMTP_CALL = {
  service: ExternalService.smtp,
  operation: EmailOperation.send_mail,
  attempt: 1,
};

const sendMail = async (input: SendEmailInput) => {
  const transport = getMailTransport();
  const startedMs = performance.now();
  try {
    const info = await transport.sendMail({
      from: process.env.EMAIL_FROM ?? DEFAULT_EMAIL_FROM,
      ...input,
    });
    recordExternalCall({
      ...SMTP_CALL,
      duration_ms: Math.round(performance.now() - startedMs),
    });
    return info;
  } catch (error) {
    recordExternalCall({
      ...SMTP_CALL,
      duration_ms: Math.round(performance.now() - startedMs),
    });
    throw smtpError(error);
  }
};

export const sendEmail = async ({
  to,
  subject,
  html,
  text,
}: SendEmailInput): Promise<SentEmail> => {
  const info = await sendMail({ to, subject, html, text });
  return {
    messageId: info.messageId,
    accepted: info.accepted ?? [],
    rejected: info.rejected ?? [],
  };
};
