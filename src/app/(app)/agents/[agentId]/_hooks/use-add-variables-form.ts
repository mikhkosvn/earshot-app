'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

import { dynamicVariableValuesSchema } from '@/server/agents/schemas';

import {
  EMPTY_VARIABLE,
  VariableEditorMode,
} from '../_constants/variable-editor-mode';
import {
  addVariablesFormSchema,
  type AddVariablesFormValues,
} from '../_schemas/add-variables-form-schema';
import { firstIssueMessage } from '../_utils/first-issue-message';
import { useAddDynamicVariablesMutation } from './mutations/dynamic-variables/use-add-dynamic-variables-mutation';
import { useAgentId } from './use-agent-id';

const jsonVariablesSchema = z.array(dynamicVariableValuesSchema).min(1);

const parseVariablesJson = (text: string) => {
  try {
    const result = jsonVariablesSchema.safeParse(JSON.parse(text));
    if (result.success) return { variables: result.data, error: null };
    return { variables: null, error: firstIssueMessage(result.error) };
  } catch {
    return { variables: null, error: 'Enter valid JSON.' };
  }
};

export const useAddVariablesForm = (onSaved: () => void) => {
  const agentId = useAgentId();
  const [mode, setMode] = useState<VariableEditorMode>(VariableEditorMode.form);
  const [jsonText, setJsonText] = useState('');
  const [jsonError, setJsonError] = useState<string | null>(null);
  const form = useForm<AddVariablesFormValues>({
    resolver: zodResolver(addVariablesFormSchema),
    defaultValues: { variables: [EMPTY_VARIABLE] },
  });
  const rows = useFieldArray({ control: form.control, name: 'variables' });
  const addVariables = useAddDynamicVariablesMutation();

  const applyJson = () => {
    const parsed = parseVariablesJson(jsonText);
    setJsonError(parsed.error);
    if (!parsed.variables) return false;
    form.setValue('variables', parsed.variables);
    return true;
  };

  const changeMode = (next: VariableEditorMode) => {
    if (next === mode) return;
    if (next === VariableEditorMode.json) {
      setJsonText(JSON.stringify(form.getValues('variables'), null, 2));
      setJsonError(null);
      setMode(next);
      return;
    }
    if (!applyJson()) return;
    setMode(next);
  };

  const submitValues = form.handleSubmit((values) =>
    addVariables.mutate(
      { agentId, variables: values.variables },
      {
        onSuccess: (result) => {
          if (!result.ok) return;
          onSaved();
        },
      },
    ),
  );

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (mode === VariableEditorMode.json && !applyJson()) return;
    void submitValues(event);
  };

  return {
    form,
    rows,
    mode,
    changeMode,
    jsonText,
    setJsonText,
    jsonError,
    onSubmit,
    isPending: addVariables.isPending,
  };
};
