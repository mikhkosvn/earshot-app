'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { saveRubricAction } from '@/server/rubric/actions';
import type { SaveRubricInput } from '@/server/rubric/types';

import { RubricService } from '../../_service';

export const useSaveRubricMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: RubricService.saveRubricMutationKey,
    mutationFn: (input: SaveRubricInput) => saveRubricAction(input),
    onSuccess: (result, input) => {
      if (!result.ok) return;
      return queryClient.invalidateQueries({
        queryKey: RubricService.getRubricQuery({ projectId: input.projectId })
          .queryKey,
      });
    },
  });
};
