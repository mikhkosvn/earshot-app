'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { KnowledgeConnectorType } from '@/generated/prisma/enums';
import { knowledgeConnectorFormSchema } from '@/server/agents/schemas';
import type { KnowledgeConnectorFormValues } from '@/server/agents/types';

import { useCreateKnowledgeConnectorMutation } from './mutations/knowledge/use-create-knowledge-connector-mutation';
import { useAgentId } from './use-agent-id';

export const useAddConnectorForm = (onCreated: () => void) => {
  const agentId = useAgentId();
  const form = useForm<KnowledgeConnectorFormValues>({
    resolver: zodResolver(knowledgeConnectorFormSchema),
    defaultValues: {
      name: '',
      syncEnabled: true,
      syncIntervalDays: 1,
      type: KnowledgeConnectorType.google_bigquery,
      serviceAccountJson: '',
      query: '',
      url: '',
    },
  });
  const createConnector = useCreateKnowledgeConnectorMutation();

  const onSubmit = form.handleSubmit((connector) =>
    createConnector.mutate(
      { agentId, connector },
      {
        onSuccess: (result) => {
          if (!result.ok) return;
          onCreated();
        },
      },
    ),
  );

  return { form, onSubmit, isPending: createConnector.isPending };
};
