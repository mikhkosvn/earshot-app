'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { PhoneNumberProvider } from '@/generated/prisma/enums';
import { importPhoneNumberFormSchema } from '@/server/telephony-phone-numbers/schemas';
import type { ImportPhoneNumberFormValues } from '@/server/telephony-phone-numbers/types';

import { useCurrentOrganizationId } from '../../_hooks/use-current-organization-id';
import { useCreatePhoneNumberMutation } from './mutations/use-create-phone-number-mutation';

const EMPTY_PHONE_NUMBER: ImportPhoneNumberFormValues = {
  provider: PhoneNumberProvider.twilio,
  phoneNumber: '',
  name: '',
  accountSid: '',
  authToken: '',
  smsEnabled: false,
};

export const useImportPhoneNumberForm = () => {
  const organizationId = useCurrentOrganizationId();
  const form = useForm<ImportPhoneNumberFormValues>({
    resolver: zodResolver(importPhoneNumberFormSchema),
    defaultValues: EMPTY_PHONE_NUMBER,
  });
  const createPhoneNumber = useCreatePhoneNumberMutation();

  const onSubmit = form.handleSubmit((values) =>
    createPhoneNumber.mutate(
      { organizationId, ...values },
      {
        onSuccess: (result) => {
          if (!result.ok) return;
          form.reset(EMPTY_PHONE_NUMBER);
        },
      },
    ),
  );

  return { form, onSubmit };
};
