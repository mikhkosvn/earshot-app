import { z } from 'zod';

import { PhoneNumberProvider } from '@/generated/prisma/enums';
import { PhoneNumberAccountLabel } from '@/server/telephony-phone-numbers/constants/phone-number-credential-labels';

const idSchema = z.number().int().positive();

const phoneNumberFieldsSchema = z.object({
  provider: z.enum(PhoneNumberProvider),
  phoneNumber: z
    .string()
    .trim()
    .regex(
      /^\+[1-9]\d{6,14}$/,
      'Enter the phone number in international format, for example +14155550100.',
    ),
  name: z
    .string()
    .trim()
    .min(1, 'Enter a name for this number.')
    .max(100, 'The name must have 100 or fewer characters.'),
  accountSid: z.string().trim().max(200),
  authToken: z.string().trim().max(500),
  smsEnabled: z.boolean(),
});

type PhoneNumberFields = z.output<typeof phoneNumberFieldsSchema>;

const checkAccountId = (
  values: PhoneNumberFields,
  context: z.RefinementCtx,
) => {
  const accountLabel = PhoneNumberAccountLabel[values.provider];
  if (!accountLabel || values.accountSid) return;
  context.addIssue({
    code: 'custom',
    path: ['accountSid'],
    message: `Enter the ${accountLabel}.`,
  });
};

const checkAuthToken = (
  values: PhoneNumberFields,
  context: z.RefinementCtx,
) => {
  if (values.authToken) return;
  context.addIssue({
    code: 'custom',
    path: ['authToken'],
    message: 'Enter the secret of the provider account.',
  });
};

export const importPhoneNumberFormSchema = phoneNumberFieldsSchema
  .superRefine(checkAccountId)
  .superRefine(checkAuthToken);

export const editPhoneNumberFormSchema =
  phoneNumberFieldsSchema.superRefine(checkAccountId);

export const listPhoneNumbersSchema = z.object({
  organizationId: idSchema,
});

export const createPhoneNumberSchema = phoneNumberFieldsSchema
  .extend({ organizationId: idSchema })
  .superRefine(checkAccountId)
  .superRefine(checkAuthToken);

export const updatePhoneNumberSchema = phoneNumberFieldsSchema
  .extend({ phoneNumberId: idSchema })
  .superRefine(checkAccountId);

export const deletePhoneNumberSchema = z.object({
  phoneNumberId: idSchema,
});
