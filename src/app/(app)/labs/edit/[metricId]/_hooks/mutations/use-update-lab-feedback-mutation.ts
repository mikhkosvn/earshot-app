'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { LabService } from '@/app/(app)/labs/_service';
import { updateLabFeedbackAction } from '@/server/labs/actions';
import type { UpdateLabFeedbackInput } from '@/server/labs/types';

export const useUpdateLabFeedbackMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: LabService.updateFeedbackMutationKey,
    mutationFn: (input: UpdateLabFeedbackInput) =>
      updateLabFeedbackAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('The notes are saved.');
      return queryClient.invalidateQueries({
        queryKey: LabService.getLabQuery({ metricId: result.data.metricId })
          .queryKey,
      });
    },
  });
};
