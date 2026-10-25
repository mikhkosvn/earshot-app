'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { ShellKey } from '@/app/(app)/_service';
import { updateMemberRoleAction } from '@/server/members/actions';
import type { UpdateMemberRoleInput } from '@/server/members/types';

import { OrganizationSettingsKey } from '../../../_service';
import { MembersKey, MembersService } from '../../_service';

export const useUpdateMemberRoleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: MembersService.updateRoleMutationKey,
    mutationFn: (input: UpdateMemberRoleInput) => updateMemberRoleAction(input),
    onSuccess: (result) => {
      if (!result.ok) return;
      toast.success('The role is saved.');
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: [MembersKey.list] }),
        queryClient.invalidateQueries({
          queryKey: [OrganizationSettingsKey.settings],
        }),
        queryClient.invalidateQueries({ queryKey: [ShellKey.project] }),
      ]);
    },
  });
};
