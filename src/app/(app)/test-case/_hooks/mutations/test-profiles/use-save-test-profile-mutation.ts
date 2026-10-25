'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { EvaluatorService } from '@/app/(app)/test-case/_service';
import {
  createTestProfileAction,
  updateTestProfileAction,
} from '@/server/test-profiles/actions';
import type {
  CreateTestProfileInput,
  UpdateTestProfileInput,
} from '@/server/test-profiles/types';

type SaveTestProfileInput =
  { create: CreateTestProfileInput } | { update: UpdateTestProfileInput };

const saveTestProfile = (input: SaveTestProfileInput) => {
  if ('update' in input) return updateTestProfileAction(input.update);
  return createTestProfileAction(input.create);
};

export const useSaveTestProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: EvaluatorService.saveTestProfileMutationKey,
    mutationFn: saveTestProfile,
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success(`Test profile "${result.data.name}" saved`);
      return Promise.all([
        queryClient.invalidateQueries({
          queryKey: EvaluatorService.testProfilesKey,
        }),
        queryClient.invalidateQueries({ queryKey: EvaluatorService.listKey }),
      ]);
    },
  });
};
