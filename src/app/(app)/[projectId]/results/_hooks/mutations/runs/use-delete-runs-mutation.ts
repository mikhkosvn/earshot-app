'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { deleteRunsAction } from '@/server/results/actions';

import { ResultService } from '../../../_service';
import { invalidateRunAndListQueries } from '../../../_utils/runs/invalidate-run-queries';

type DeleteRunsVariables = {
  resultId: number;
  runIds: number[];
};

export const useDeleteRunsMutation = () => {
  const projectId = useCurrentProjectId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ResultService.deleteRunsMutationKey,
    mutationFn: ({ resultId, runIds }: DeleteRunsVariables) =>
      deleteRunsAction({ projectId, resultId, runIds }),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('The runs are deleted.');
      return invalidateRunAndListQueries(queryClient);
    },
  });
};
