'use client';

import { useIsMutating } from '@tanstack/react-query';

import { MonitorService } from '../_service';

export const useIsSavingMonitor = () => {
  const creating = useIsMutating({
    mutationKey: MonitorService.createMutationKey,
  });
  const updating = useIsMutating({
    mutationKey: MonitorService.updateMutationKey,
  });
  return creating + updating > 0;
};
