'use client';

import type { UseFormReturn } from 'react-hook-form';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import type { AgentConfigValues, CreatedAgent } from '@/server/agents/types';

import { useCheckAgentConfigMutation } from './mutations/use-check-agent-config-mutation';
import { useCreateAgentMutation } from './mutations/use-create-agent-mutation';

interface CreateAgentSubmitHandlers {
  onCheckFailed: (message: string) => void;
  onCreated: (agent: CreatedAgent) => void;
}

export const useCreateAgentSubmit = (
  form: UseFormReturn<AgentConfigValues>,
  { onCheckFailed, onCreated }: CreateAgentSubmitHandlers,
) => {
  const projectId = useCurrentProjectId();
  const checkConfig = useCheckAgentConfigMutation();
  const createAgent = useCreateAgentMutation();

  const create = (values: AgentConfigValues) =>
    createAgent.mutate(
      { projectId, ...values },
      {
        onSuccess: (result) => {
          if (!result.ok) return;
          onCreated(result.data);
        },
      },
    );

  const onCreate = form.handleSubmit((values) =>
    checkConfig.mutate(
      { projectId, ...values },
      {
        onSuccess: (result) => {
          if (!result.ok) return;
          if (!result.data.valid) {
            onCheckFailed(result.data.message ?? '');
            return;
          }
          create(values);
        },
      },
    ),
  );

  const onCreateAnyway = () => create(form.getValues());

  return { onCreate, onCreateAnyway };
};
