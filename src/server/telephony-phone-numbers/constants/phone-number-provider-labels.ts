import { PhoneNumberProvider } from '@/generated/prisma/enums';

export const PhoneNumberProviderLabel: Record<PhoneNumberProvider, string> = {
  [PhoneNumberProvider.twilio]: 'Twilio',
  [PhoneNumberProvider.telnyx]: 'Telnyx',
  [PhoneNumberProvider.plivo]: 'Plivo',
};
