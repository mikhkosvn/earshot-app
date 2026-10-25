import 'server-only';

import type { PhoneNumberRow } from '@/server/telephony-phone-numbers/types';

export const phoneNumberRowSelect = {
  id: true,
  provider: true,
  phoneNumber: true,
  name: true,
  accountSid: true,
  authTokenEncrypted: true,
  smsEnabled: true,
  createdAt: true,
  importedBy: { select: { name: true } },
} as const;

type PhoneNumberRecord = Omit<
  PhoneNumberRow,
  'hasAuthToken' | 'importedByName'
> & {
  authTokenEncrypted: string | null;
  importedBy: { name: string } | null;
};

export const toPhoneNumberRow = ({
  authTokenEncrypted,
  importedBy,
  ...record
}: PhoneNumberRecord): PhoneNumberRow => ({
  ...record,
  hasAuthToken: authTokenEncrypted !== null,
  importedByName: importedBy?.name ?? null,
});
