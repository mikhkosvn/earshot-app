'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { updateRunFeedbackSchema } from '@/server/run-reviews/schemas';
import type { UpdateRunFeedbackInput } from '@/server/run-reviews/types';

import { useUpdateRunFeedbackMutation } from '../mutations/runs/use-update-run-feedback-mutation';

interface UseRunFeedbackFormArgs {
  runId: number;
  feedback: string | null;
  onSaved: () => void;
}

export const useRunFeedbackForm = ({
  runId,
  feedback,
  onSaved,
}: UseRunFeedbackFormArgs) => {
  const form = useForm<UpdateRunFeedbackInput>({
    resolver: zodResolver(updateRunFeedbackSchema),
    defaultValues: { runId, feedback: feedback ?? '' },
  });
  const updateFeedback = useUpdateRunFeedbackMutation();

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
