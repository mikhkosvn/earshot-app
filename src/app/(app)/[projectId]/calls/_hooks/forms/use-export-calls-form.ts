'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useCallListScope } from '../call-list/use-call-list-scope';
import {
  exportCallsFormSchema,
  type ExportCallsFormValues,
} from '../../_schemas/export-calls-form-schema';
import { useExportCallsMutation } from '../mutations/call-ingest/use-export-calls-mutation';

export const useExportCallsForm = (onStarted: () => void) => {
  const scope = useCallListScope();
  const form = useForm<ExportCallsFormValues>({
    resolver: zodResolver(exportCallsFormSchema),
    defaultValues: { numRecords: 0 },
  });
  const exportCalls = useExportCallsMutation();

  const onSubmit = form.handleSubmit((values) =>
    exportCalls.mutate(
      { ...scope, numRecords: values.numRecords },
      {
        onSuccess: (result) => {
          if (!result.ok) return;
          form.reset();
          onStarted();
        },
      },
    ),
  );

  return { form, onSubmit, isPending: exportCalls.isPending };
};
