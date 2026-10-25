'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { forkPersonalityAction } from '@/server/personalities/actions';
import type { ForkPersonalityInput } from '@/server/personalities/types';

import { PersonalityService } from '../../../_service';

export const useForkPersonalityMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: PersonalityService.forkMutationKey,
    mutationFn: (input: ForkPersonalityInput) => forkPersonalityAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      return queryClient.invalidateQueries({
        queryKey: PersonalityService.listKey,
      });
    },
  });
};
