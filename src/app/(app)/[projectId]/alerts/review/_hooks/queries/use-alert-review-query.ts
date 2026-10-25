'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';

import { AlertService } from '../../_service';
import { useAlertWindow } from '../params/use-alert-window';

export const useAlertReviewQuery = () => {
  const projectId = useCurrentProjectId();
  const { hours } = useAlertWindow();
  return useSuspenseQuery(AlertService.getReviewQuery({ projectId, hours }));
};
