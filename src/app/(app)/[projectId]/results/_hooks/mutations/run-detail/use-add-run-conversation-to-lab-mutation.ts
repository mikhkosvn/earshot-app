'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { addConversationToLabAction } from '@/server/lab-test-sets/actions';

import { ResultService } from '../../../_service';

export const useAddRunConversationToLabMutation = () => {
  const projectId = useCurrentProjectId();

  return useMutation({
    mutationKey: ResultService.addRunsToLabMutationKey,
    mutationFn: (conversationId: number) =>
      addConversationToLabAction({
        projectId,
        conversationId,
        corrections: [],
      }),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('The run is added to Labs.');
    },
  });
};
