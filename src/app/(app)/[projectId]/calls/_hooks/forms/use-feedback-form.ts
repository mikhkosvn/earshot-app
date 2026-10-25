'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { updateCallFeedbackSchema } from '@/server/call-logs/schemas';
import type { UpdateCallFeedbackInput } from '@/server/call-logs/types';

import { useUpdateFeedbackMutation } from '../mutations/call-review/use-update-feedback-mutation';

export const useFeedbackForm = (
  callLogId: number,
  feedback: string | null,
  onSaved: () => void,
) => {
  const form = useForm<UpdateCallFeedbackInput>({
    resolver: zodResolver(updateCallFeedbackSchema),
    defaultValues: { callLogId, feedback: feedback ?? '' },
  });
  const updateFeedback = useUpdateFeedbackMutation();

  const onSubmit = form.handleSubmit((values) =>
    updateFeedback.mutate(values, {
      onSuccess: (result) => {
        if (!result.ok) return;
        onSaved();
      },
    }),
  );

  return { form, onSubmit };
};
