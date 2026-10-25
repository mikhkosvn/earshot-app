'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { AlertService } from '../_service';

const REFRESH_KEYS = [
  AlertService.reviewKey,
  AlertService.fireCountsKey,
  AlertService.listKey,
];

export const useRefreshAlerts = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      Promise.all(
        REFRESH_KEYS.map((queryKey) =>
          queryClient.invalidateQueries({ queryKey }),
        ),
      ),
  });
};
