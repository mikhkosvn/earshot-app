'use client';

import { useMutation } from '@tanstack/react-query';

import { checkAgentConnectionsAction } from '@/server/agents/actions';
import type { AgentIdInput } from '@/server/agents/types';

import { AgentService } from '../../../_service';

export const useCheckAgentConnectionsMutation = () =>
  useMutation({
    mutationKey: AgentService.checkConnectionsMutationKey,
    mutationFn: (input: AgentIdInput) => checkAgentConnectionsAction(input),
  });
