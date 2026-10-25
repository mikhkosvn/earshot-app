'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';

import { AlertService } from '../../_service';

export const useAlertListQuery = () => {
  const projectId = useCurrentProjectId();
  return useSuspenseQuery(AlertService.getListQuery({ projectId }));
};
