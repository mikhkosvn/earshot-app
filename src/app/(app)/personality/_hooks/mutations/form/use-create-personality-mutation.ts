'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createPersonalityAction } from '@/server/personalities/actions';
import type { CreatePersonalityInput } from '@/server/personalities/types';

import { PersonalityService } from '../../../_service';

export const useCreatePersonalityMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: PersonalityService.createMutationKey,
    mutationFn: (input: CreatePersonalityInput) =>
      createPersonalityAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('Personality created successfully');
      return queryClient.invalidateQueries({
        queryKey: PersonalityService.listKey,
      });
    },
  });
};
