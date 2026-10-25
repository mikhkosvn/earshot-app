'use client';

import { useIsMutating } from '@tanstack/react-query';

import { AgentService } from '../../_service';

export const useIsSavingAgent = () =>
  useIsMutating({ mutationKey: AgentService.updateMutationKey }) > 0;
