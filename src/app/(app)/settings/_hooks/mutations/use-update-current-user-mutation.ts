'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { ShellService } from '@/app/(app)/_service';
import { updateCurrentUserAction } from '@/server/users/actions';
import type { UpdateCurrentUserInput } from '@/server/users/types';

export const useUpdateCurrentUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ShellService.updateCurrentUserMutationKey,
    mutationFn: (input: UpdateCurrentUserInput) =>
      updateCurrentUserAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('The account is saved.');
      return queryClient.invalidateQueries({
        queryKey: ShellService.getCurrentUserQuery().queryKey,
      });
    },
  });
};
