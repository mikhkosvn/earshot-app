'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { addRunsToLabAction } from '@/server/lab-test-sets/actions';

import { ResultService } from '../../../_service';

export const useAddRunsToLabMutation = () => {
  const projectId = useCurrentProjectId();

  return useMutation({
    mutationKey: ResultService.addRunsToLabMutationKey,
    mutationFn: (runIds: number[]) => addRunsToLabAction({ projectId, runIds }),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('The runs are added to Labs.');
    },
  });
};
