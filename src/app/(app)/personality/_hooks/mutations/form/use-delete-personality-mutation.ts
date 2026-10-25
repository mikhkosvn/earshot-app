'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deletePersonalityAction } from '@/server/personalities/actions';
import type { PersonalityIdInput } from '@/server/personalities/types';

import { PersonalityService } from '../../../_service';

export const useDeletePersonalityMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: PersonalityService.deleteMutationKey,
    mutationFn: (input: PersonalityIdInput) => deletePersonalityAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('Personality deleted successfully');
      return queryClient.invalidateQueries({
        queryKey: PersonalityService.listKey,
      });
    },
  });
};
