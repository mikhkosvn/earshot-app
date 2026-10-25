'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import type { MockToolItem } from '@/server/agents/types';

import { DEFAULT_MOCK_TOOL_MAPPINGS_JSON } from '../_constants/mock-tool-defaults';
import {
  mockToolFormSchema,
  type MockToolFormValues,
  toMappings,
} from '../_schemas/mock-tool-form-schema';
import { useCreateMockToolMutation } from './mutations/mock-tools/use-create-mock-tool-mutation';
import { useUpdateMockToolMutation } from './mutations/mock-tools/use-update-mock-tool-mutation';
import { useAgentId } from './use-agent-id';

const defaultValuesOf = (tool: MockToolItem | null): MockToolFormValues => {
  if (!tool) {
    return {
      name: '',
      description: '',
      mappingsJson: DEFAULT_MOCK_TOOL_MAPPINGS_JSON,
    };
  }
  return {
    name: tool.name,
    description: tool.description ?? '',
    mappingsJson: JSON.stringify(tool.mappings, null, 2),
  };
};

export const useMockToolForm = (
  tool: MockToolItem | null,
  onSaved: () => void,
) => {
  const agentId = useAgentId();
  const form = useForm<MockToolFormValues>({
    resolver: zodResolver(mockToolFormSchema),
    defaultValues: defaultValuesOf(tool),
  });
  const createTool = useCreateMockToolMutation();
  const updateTool = useUpdateMockToolMutation();
  const handlers = {
    onSuccess: (result: { ok: boolean }) => {
      if (!result.ok) return;
      onSaved();
    },
  };

  const onSubmit = form.handleSubmit((values) => {
    const input = {
      name: values.name,
      description: values.description,
      mappings: toMappings(values.mappingsJson),
    };
    if (tool) {
      updateTool.mutate({ mockToolId: tool.id, ...input }, handlers);
      return;
    }
    createTool.mutate({ agentId, ...input }, handlers);
  });

  return {
    form,
    onSubmit,
    isPending: createTool.isPending || updateTool.isPending,
  };
};
