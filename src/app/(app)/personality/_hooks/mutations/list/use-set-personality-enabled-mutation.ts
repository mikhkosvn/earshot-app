'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { setPersonalityEnabledAction } from '@/server/personalities/actions';
import type { SetPersonalityEnabledInput } from '@/server/personalities/types';

import { PersonalityService } from '../../../_service';

export const useSetPersonalityEnabledMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: PersonalityService.setEnabledMutationKey,
    mutationFn: (input: SetPersonalityEnabledInput) =>
      setPersonalityEnabledAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      return queryClient.invalidateQueries({
        queryKey: PersonalityService.listKey,
      });
    },
  });
};
