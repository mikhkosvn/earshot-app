'use client';

import { useIsMutating } from '@tanstack/react-query';

import { AgentService } from '../../_service';

export const useIsCreatingAgent = () => {
  const checking = useIsMutating({
    mutationKey: AgentService.checkConfigMutationKey,
  });
  const creating = useIsMutating({
    mutationKey: AgentService.createMutationKey,
  });
  return checking + creating > 0;
};
