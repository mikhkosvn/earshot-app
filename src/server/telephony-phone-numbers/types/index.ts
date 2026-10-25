import type { z } from 'zod';

import type { PhoneNumberProvider } from '@/generated/prisma/enums';
import type {
  createPhoneNumberSchema,
  deletePhoneNumberSchema,
  editPhoneNumberFormSchema,
  importPhoneNumberFormSchema,
  listPhoneNumbersSchema,
  updatePhoneNumberSchema,
} from '@/server/telephony-phone-numbers/schemas';

export type ListPhoneNumbersInput = z.input<typeof listPhoneNumbersSchema>;
export type CreatePhoneNumberInput = z.input<typeof createPhoneNumberSchema>;
export type UpdatePhoneNumberInput = z.input<typeof updatePhoneNumberSchema>;
export type DeletePhoneNumberInput = z.input<typeof deletePhoneNumberSchema>;
export type ImportPhoneNumberFormValues = z.input<
  typeof importPhoneNumberFormSchema
>;
export type EditPhoneNumberFormValues = z.input<
  typeof editPhoneNumberFormSchema
>;

export interface PhoneNumberRow {
  id: number;
  provider: PhoneNumberProvider;
  phoneNumber: string;
  name: string;
  accountSid: string | null;
  hasAuthToken: boolean;
  smsEnabled: boolean;
  importedByName: string | null;
  createdAt: Date;
}
