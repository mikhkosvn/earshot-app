import 'server-only';

import { DEFAULT_EMAIL_FROM } from '@/server/email/constants/smtp-defaults';
import type { SendEmailInput, SentEmail } from '@/server/email/types';
import { getMailTransport } from '@/server/email/utils/get-mail-transport';

export const sendEmail = async ({
  to,
  subject,
  html,
  text,
}: SendEmailInput): Promise<SentEmail> => {
  const info = await getMailTransport().sendMail({
    from: process.env.EMAIL_FROM ?? DEFAULT_EMAIL_FROM,
    to,
    subject,
    html,
    text,
  });
  return {
    messageId: info.messageId,
    accepted: info.accepted ?? [],
    rejected: info.rejected ?? [],
  };
};
