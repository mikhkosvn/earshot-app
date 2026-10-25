'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { addConversationToLabAction } from '@/server/lab-test-sets/actions';

import { CallService } from '../../../_service';

export const useAddCallToLabMutation = () => {
  const projectId = useCurrentProjectId();

  return useMutation({
    mutationKey: CallService.addToLabMutationKey,
    mutationFn: ({ conversationId }: { conversationId: number }) =>
      addConversationToLabAction({
        projectId,
        conversationId,
        corrections: [],
      }),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('The call is added to Labs.');
    },
  });
};
