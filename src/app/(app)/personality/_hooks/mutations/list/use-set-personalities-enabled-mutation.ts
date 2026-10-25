'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { setPersonalitiesEnabledAction } from '@/server/personalities/actions';
import type { SetPersonalitiesEnabledInput } from '@/server/personalities/types';

import { PersonalityService } from '../../../_service';

export const useSetPersonalitiesEnabledMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: PersonalityService.setAllEnabledMutationKey,
    mutationFn: (input: SetPersonalitiesEnabledInput) =>
      setPersonalitiesEnabledAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      return queryClient.invalidateQueries({
        queryKey: PersonalityService.listKey,
      });
    },
  });
};
