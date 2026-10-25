'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';

import { CallService } from '../../_service';

export const useMetricColumnsQuery = () => {
  const projectId = useCurrentProjectId();
  return useSuspenseQuery(CallService.getMetricColumnsQuery({ projectId }));
};
