'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createPhoneNumberAction } from '@/server/telephony-phone-numbers/actions';
import type { CreatePhoneNumberInput } from '@/server/telephony-phone-numbers/types';

import { TelephonyKey, TelephonyService } from '../../_service';

export const useCreatePhoneNumberMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: TelephonyService.createPhoneNumberMutationKey,
    mutationFn: (input: CreatePhoneNumberInput) =>
      createPhoneNumberAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('The phone number is imported.');
      return queryClient.invalidateQueries({
        queryKey: [TelephonyKey.phoneNumbers],
      });
    },
  });
};
