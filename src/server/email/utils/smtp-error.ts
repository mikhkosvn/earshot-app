import 'server-only';

import { ExternalService } from '@/server/common/logging/constants';
import { ExternalCallError } from '@/server/common/logging/errors/external-call-error';
import { EmailOperation } from '@/server/email/constants/email-operation';
import { redactEmailAddresses } from '@/server/email/utils/redact-email-addresses';

const readText = (error: unknown, key: string) => {
  if (typeof error !== 'object' || error === null) return undefined;
  const value: unknown = Reflect.get(error, key);
  if (typeof value === 'string') return redactEmailAddresses(value);
  if (typeof value === 'number') return String(value);
  return undefined;
};

const messageOf = (error: unknown) => {
  if (error instanceof Error) return redactEmailAddresses(error.message);
  return redactEmailAddresses(String(error));
};

export const smtpError = (error: unknown) =>
  new ExternalCallError({
    service: ExternalService.smtp,
    operation: EmailOperation.send_mail,
    attempt: 1,
    message: messageOf(error),
    code: readText(error, 'code') ?? readText(error, 'responseCode'),
    response: readText(error, 'response'),
  });
