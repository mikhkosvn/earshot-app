'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import type { LabRowView } from '@/server/labs/types';

import {
  type ExpectedValueFormInput,
  expectedValueFormSchema,
  type ExpectedValueFormValues,
} from '../../_schemas/lab-review-form-schemas';
import { useUpdateLabExpectedMutation } from '../mutations/use-update-lab-expected-mutation';

export const useExpectedValueForm = (row: LabRowView, onSaved: () => void) => {
  const form = useForm<ExpectedValueFormInput, unknown, ExpectedValueFormValues>(
    {
      resolver: zodResolver(expectedValueFormSchema),
      defaultValues: { expectedValue: row.expected },
    },
  );
  const updateExpected = useUpdateLabExpectedMutation();

  const onSubmit = form.handleSubmit((values) =>
    updateExpected.mutate(
      { reviewId: row.reviewId, ...values },
      {
        onSuccess: (result) => {
          if (!result.ok) return;
          onSaved();
        },
      },
    ),
  );

  return { form, onSubmit, isSaving: updateExpected.isPending };
};
