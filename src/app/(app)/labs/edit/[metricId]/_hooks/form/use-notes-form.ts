'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import type { LabRowView } from '@/server/labs/types';

import {
  type NotesFormInput,
  notesFormSchema,
  type NotesFormValues,
} from '../../_schemas/lab-review-form-schemas';
import { useUpdateLabFeedbackMutation } from '../mutations/use-update-lab-feedback-mutation';

export const useNotesForm = (row: LabRowView, onSaved: () => void) => {
  const form = useForm<NotesFormInput, unknown, NotesFormValues>({
    resolver: zodResolver(notesFormSchema),
    defaultValues: { feedback: row.feedback ?? '' },
  });
  const updateFeedback = useUpdateLabFeedbackMutation();

  const onSubmit = form.handleSubmit((values) =>
    updateFeedback.mutate(
      { reviewId: row.reviewId, ...values },
      {
        onSuccess: (result) => {
          if (!result.ok) return;
          onSaved();
        },
      },
    ),
  );

  return { form, onSubmit, isSaving: updateFeedback.isPending };
};
