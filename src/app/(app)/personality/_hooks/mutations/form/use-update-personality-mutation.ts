'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { updatePersonalityAction } from '@/server/personalities/actions';
import type { UpdatePersonalityInput } from '@/server/personalities/types';

import { PersonalityService } from '../../../_service';

export const useUpdatePersonalityMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: PersonalityService.updateMutationKey,
    mutationFn: (input: UpdatePersonalityInput) =>
      updatePersonalityAction(input),
    onSuccess: (result, input) => {
      if (!result.ok) return;
      toast.success('Personality updated successfully');
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: PersonalityService.listKey }),
        queryClient.invalidateQueries({
          queryKey: PersonalityService.getPersonalityQuery({
            personalityId: input.personalityId,
          }).queryKey,
          refetchType: 'none',
        }),
      ]);
    },
  });
};
