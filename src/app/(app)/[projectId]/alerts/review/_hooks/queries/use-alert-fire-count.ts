'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';

import { AlertService } from '../../_service';
import { useAlertWindow } from '../params/use-alert-window';

export const useAlertFireCount = (alertId: number) => {
  const projectId = useCurrentProjectId();
  const { hours } = useAlertWindow();
  const { data } = useSuspenseQuery({
    ...AlertService.getFireCountsQuery({ projectId, hours }),
    select: (counts) => counts[alertId] ?? 0,
  });
  return data;
};
