'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { updatePhoneNumberAction } from '@/server/telephony-phone-numbers/actions';
import type { UpdatePhoneNumberInput } from '@/server/telephony-phone-numbers/types';

import { TelephonyKey, TelephonyService } from '../../_service';

export const useUpdatePhoneNumberMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: TelephonyService.updatePhoneNumberMutationKey,
    mutationFn: (input: UpdatePhoneNumberInput) =>
      updatePhoneNumberAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('The phone number is saved.');
      return queryClient.invalidateQueries({
        queryKey: [TelephonyKey.phoneNumbers],
      });
    },
  });
};
