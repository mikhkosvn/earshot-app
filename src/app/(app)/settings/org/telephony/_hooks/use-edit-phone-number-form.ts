'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { editPhoneNumberFormSchema } from '@/server/telephony-phone-numbers/schemas';
import type {
  EditPhoneNumberFormValues,
  PhoneNumberRow,
} from '@/server/telephony-phone-numbers/types';

import { useUpdatePhoneNumberMutation } from './mutations/use-update-phone-number-mutation';

export const useEditPhoneNumberForm = (
  phoneNumber: PhoneNumberRow,
  onSaved: () => void,
) => {
  const form = useForm<EditPhoneNumberFormValues>({
    resolver: zodResolver(editPhoneNumberFormSchema),
    defaultValues: {
      provider: phoneNumber.provider,
      phoneNumber: phoneNumber.phoneNumber,
      name: phoneNumber.name,
      accountSid: phoneNumber.accountSid ?? '',
      authToken: '',
      smsEnabled: phoneNumber.smsEnabled,
    },
  });
  const updatePhoneNumber = useUpdatePhoneNumberMutation();

  const onSubmit = form.handleSubmit((values) =>
    updatePhoneNumber.mutate(
      { phoneNumberId: phoneNumber.id, ...values },
      {
        onSuccess: (result) => {
          if (!result.ok) return;
          onSaved();
        },
      },
    ),
  );

  return { form, onSubmit };
};
