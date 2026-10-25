'use client';

import { useMutation } from '@tanstack/react-query';

import { reconfigureAgentAction } from '@/server/agents/actions';
import type { AgentIdInput } from '@/server/agents/types';

import { AgentService } from '../../../_service';

export const useReconfigureAgentMutation = () =>
  useMutation({
    mutationKey: AgentService.reconfigureMutationKey,
    mutationFn: (input: AgentIdInput) => reconfigureAgentAction(input),
  });
