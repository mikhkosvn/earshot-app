'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { EvaluatorService } from '@/app/(app)/test-case/_service';
import { deleteTestProfileAction } from '@/server/test-profiles/actions';
import type { TestProfileIdInput } from '@/server/test-profiles/types';

export const useDeleteTestProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: EvaluatorService.deleteTestProfileMutationKey,
    mutationFn: (input: TestProfileIdInput) => deleteTestProfileAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('Test profile deleted');
      return Promise.all([
        queryClient.invalidateQueries({
          queryKey: EvaluatorService.testProfilesKey,
        }),
        queryClient.invalidateQueries({ queryKey: EvaluatorService.listKey }),
      ]);
    },
  });
};
