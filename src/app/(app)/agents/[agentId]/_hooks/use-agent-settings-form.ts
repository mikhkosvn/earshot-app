'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { agentSettingsSchema } from '@/server/agents/schemas';
import type { AgentSettingsValues } from '@/server/agents/types';

import { toAgentSettingsValues } from '../_utils/agent-settings-values';
import { useUpdateAgentMutation } from './mutations/use-update-agent-mutation';
import { useAgent } from './use-agent';

export const useAgentSettingsForm = () => {
  const agent = useAgent();
  const form = useForm<AgentSettingsValues>({
    resolver: zodResolver(agentSettingsSchema),
    defaultValues: toAgentSettingsValues(agent),
  });
  const updateAgent = useUpdateAgentMutation();

  const onSubmit = form.handleSubmit((values) =>
    updateAgent.mutate(
      { agentId: agent.id, ...values },
      {
        onSuccess: (result) => {
          if (!result.ok) return;
          form.reset(toAgentSettingsValues(result.data));
        },
      },
    ),
  );

  return { form, onSubmit };
};
