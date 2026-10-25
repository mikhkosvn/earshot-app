'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { LabService } from '@/app/(app)/labs/_service';
import { updateLabExpectedAction } from '@/server/labs/actions';
import type { UpdateLabExpectedInput } from '@/server/labs/types';

export const useUpdateLabExpectedMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: LabService.updateExpectedMutationKey,
    mutationFn: (input: UpdateLabExpectedInput) =>
      updateLabExpectedAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('The expected value is saved.');
      return Promise.all([
        queryClient.invalidateQueries({
          queryKey: LabService.getLabQuery({ metricId: result.data.metricId })
            .queryKey,
        }),
        queryClient.invalidateQueries({ queryKey: LabService.listKey }),
      ]);
    },
  });
};
