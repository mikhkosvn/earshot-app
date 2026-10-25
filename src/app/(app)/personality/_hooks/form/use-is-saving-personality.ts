'use client';

import { useIsMutating } from '@tanstack/react-query';

import { PersonalityService } from '../../_service';

export const useIsSavingPersonality = () => {
  const creating = useIsMutating({
    mutationKey: PersonalityService.createMutationKey,
  });
  const updating = useIsMutating({
    mutationKey: PersonalityService.updateMutationKey,
  });
  return creating + updating > 0;
};
