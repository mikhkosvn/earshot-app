'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { removeMemberAction } from '@/server/members/actions';
import type { RemoveMemberInput } from '@/server/members/types';

import { MembersKey, MembersService } from '../../_service';

export const useRemoveMemberMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: MembersService.removeMemberMutationKey,
    mutationFn: (input: RemoveMemberInput) => removeMemberAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('The member is removed.');
      return queryClient.invalidateQueries({ queryKey: [MembersKey.list] });
    },
  });
};
