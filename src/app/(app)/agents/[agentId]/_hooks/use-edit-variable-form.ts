'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { dynamicVariableValuesSchema } from '@/server/agents/schemas';
import type {
  DynamicVariableItem,
  DynamicVariableValues,
} from '@/server/agents/types';

import { useUpdateDynamicVariableMutation } from './mutations/dynamic-variables/use-update-dynamic-variable-mutation';

export const useEditVariableForm = (
  variable: DynamicVariableItem,
  onSaved: () => void,
) => {
  const form = useForm<DynamicVariableValues>({
    resolver: zodResolver(dynamicVariableValuesSchema),
    defaultValues: { name: variable.name, description: variable.description },
  });
  const updateVariable = useUpdateDynamicVariableMutation();

  const onSubmit = form.handleSubmit((values) =>
    updateVariable.mutate(
      { dynamicVariableId: variable.id, ...values },
      {
        onSuccess: (result) => {
          if (!result.ok) return;
          onSaved();
        },
      },
    ),
  );

  return { form, onSubmit, isPending: updateVariable.isPending };
};
