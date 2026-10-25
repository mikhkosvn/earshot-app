'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ShellService } from '@/app/(app)/_service';
import { updateNotificationSettingsAction } from '@/server/notification-settings/actions';
import type { UpdateNotificationSettingsInput } from '@/server/notification-settings/types';

import { NotificationSettingsService } from '../../_service';

export const useUpdateNotificationSettingsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: NotificationSettingsService.updateSettingsMutationKey,
    mutationFn: (input: UpdateNotificationSettingsInput) =>
      updateNotificationSettingsAction(input),
    onSuccess: (result, input) => {
      if (!result.ok) return;
      return Promise.all([
        queryClient.invalidateQueries({
          queryKey: NotificationSettingsService.getSettingsQuery({
            projectId: input.projectId,
          }).queryKey,
        }),
        queryClient.invalidateQueries({
          queryKey: ShellService.getProjectQuery({ projectId: input.projectId })
            .queryKey,
        }),
      ]);
    },
  });
};
