'use client';

import { useMutation } from '@tanstack/react-query';

import { checkAgentConfigAction } from '@/server/agents/actions';
import type { CheckAgentConfigInput } from '@/server/agents/types';

import { AgentService } from '../../../_service';

export const useCheckAgentConfigMutation = () =>
  useMutation({
    mutationKey: AgentService.checkConfigMutationKey,
    mutationFn: (input: CheckAgentConfigInput) => checkAgentConfigAction(input),
  });
