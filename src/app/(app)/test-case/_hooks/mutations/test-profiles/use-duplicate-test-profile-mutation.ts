'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { EvaluatorService } from '@/app/(app)/test-case/_service';
import { duplicateTestProfileAction } from '@/server/test-profiles/actions';
import type { TestProfileIdInput } from '@/server/test-profiles/types';

export const useDuplicateTestProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: EvaluatorService.duplicateTestProfileMutationKey,
    mutationFn: (input: TestProfileIdInput) =>
      duplicateTestProfileAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success(`Test profile duplicated as "${result.data.name}"`);
      return queryClient.invalidateQueries({
        queryKey: EvaluatorService.testProfilesKey,
      });
    },
  });
};
