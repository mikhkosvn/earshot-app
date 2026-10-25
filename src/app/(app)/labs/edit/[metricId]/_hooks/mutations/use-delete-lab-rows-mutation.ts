'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { LabService } from '@/app/(app)/labs/_service';
import { deleteLabTestSetsAction } from '@/server/labs/actions';
import type { DeleteLabTestSetsInput } from '@/server/labs/types';

export const useDeleteLabRowsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: LabService.deleteRowsMutationKey,
    mutationFn: (input: DeleteLabTestSetsInput) =>
      deleteLabTestSetsAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('Test sets deleted successfully');
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: LabService.detailKey }),
        queryClient.invalidateQueries({ queryKey: LabService.listKey }),
      ]);
    },
  });
};
