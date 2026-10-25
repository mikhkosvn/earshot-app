'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ShellService } from '@/app/(app)/_service';
import { markNotificationReadAction } from '@/server/notifications/actions';
import type { NotificationIdInput } from '@/server/notifications/types';

export const useMarkNotificationReadMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ShellService.markNotificationReadMutationKey,
    mutationFn: (input: NotificationIdInput) =>
      markNotificationReadAction(input),
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
