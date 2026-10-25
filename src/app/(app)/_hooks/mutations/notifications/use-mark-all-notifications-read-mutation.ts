'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ShellService } from '@/app/(app)/_service';
import { markAllNotificationsReadAction } from '@/server/notifications/actions';

export const useMarkAllNotificationsReadMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ShellService.markAllNotificationsReadMutationKey,
    mutationFn: () => markAllNotificationsReadAction(),
    onSuccess: (result) => {
      if (!result.ok) return;
      return Promise.all([
        queryClient.invalidateQueries({
          queryKey: ShellService.getNotificationsQuery().queryKey,
        }),
        queryClient.invalidateQueries({
          queryKey: ShellService.getUnreadNotificationCountQuery().queryKey,
        }),
      ]);
    },
  });
};
