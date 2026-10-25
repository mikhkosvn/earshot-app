'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deletePhoneNumberAction } from '@/server/telephony-phone-numbers/actions';
import type { DeletePhoneNumberInput } from '@/server/telephony-phone-numbers/types';

import { TelephonyKey, TelephonyService } from '../../_service';

export const useDeletePhoneNumberMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: TelephonyService.deletePhoneNumberMutationKey,
    mutationFn: (input: DeletePhoneNumberInput) =>
      deletePhoneNumberAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('The phone number is deleted.');
      return queryClient.invalidateQueries({
        queryKey: [TelephonyKey.phoneNumbers],
      });
    },
  });
};
