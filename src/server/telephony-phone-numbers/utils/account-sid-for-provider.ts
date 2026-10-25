import 'server-only';

import type { PhoneNumberProvider } from '@/generated/prisma/enums';
import { PhoneNumberAccountLabel } from '@/server/telephony-phone-numbers/constants/phone-number-credential-labels';

export const accountSidForProvider = (
  provider: PhoneNumberProvider,
  accountSid: string,
) => {
  if (PhoneNumberAccountLabel[provider] === null) return null;
  return accountSid;
};
