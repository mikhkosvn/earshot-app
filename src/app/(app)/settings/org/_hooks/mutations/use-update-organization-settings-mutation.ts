'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ShellKey, ShellService } from '@/app/(app)/_service';
import { updateOrganizationSettingsAction } from '@/server/organization-settings/actions';
import type { UpdateOrganizationSettingsInput } from '@/server/organization-settings/types';

import { OrganizationSettingsService } from '../../_service';

export const useUpdateOrganizationSettingsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: OrganizationSettingsService.updateSettingsMutationKey,
    mutationFn: (input: UpdateOrganizationSettingsInput) =>
      updateOrganizationSettingsAction(input),
    onSuccess: (result, input) => {
      if (!result.ok) return;
      return Promise.all([
        queryClient.invalidateQueries({
          queryKey: OrganizationSettingsService.getSettingsQuery({
            organizationId: input.organizationId,
          }).queryKey,
        }),
        queryClient.invalidateQueries({
          queryKey: ShellService.getOrganizationsQuery().queryKey,
        }),
        queryClient.invalidateQueries({ queryKey: [ShellKey.project] }),
      ]);
    },
  });
};
