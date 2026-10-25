'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';

import { LabService } from '../_service';

export const useLabMetrics = () => {
  const projectId = useCurrentProjectId();
  const { data } = useSuspenseQuery(LabService.getMetricsQuery({ projectId }));
  return data;
};
