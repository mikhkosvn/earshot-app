'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { cloneVoiceAction } from '@/server/voices/actions';
import type { CloneVoiceInput } from '@/server/voices/types';

import { PersonalityService } from '../../../_service';

export const useCloneVoiceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: PersonalityService.cloneVoiceMutationKey,
    mutationFn: (input: CloneVoiceInput) => cloneVoiceAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      return queryClient.invalidateQueries({
        queryKey: PersonalityService.voicesKey,
      });
    },
  });
};
