import { PhoneNumberProvider } from '@/generated/prisma/enums';

export const PhoneNumberAccountLabel: Record<
  PhoneNumberProvider,
  string | null
> = {
  [PhoneNumberProvider.twilio]: 'Twilio Account SID',
  [PhoneNumberProvider.telnyx]: null,
  [PhoneNumberProvider.plivo]: 'Plivo Auth ID',
};

export const PhoneNumberTokenLabel: Record<PhoneNumberProvider, string> = {
  [PhoneNumberProvider.twilio]: 'Twilio Auth Token',
  [PhoneNumberProvider.telnyx]: 'Telnyx API Key',
  [PhoneNumberProvider.plivo]: 'Plivo Auth Token',
};
