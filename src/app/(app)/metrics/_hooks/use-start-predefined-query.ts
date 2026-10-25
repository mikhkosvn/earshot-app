'use client';

import { noop, useQueryClient } from '@tanstack/react-query';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';

import { MetricService } from '../_service';

export const useStartPredefinedQuery = () => {
  const queryClient = useQueryClient();
  const projectId = useCurrentProjectId();

  return () => {
    void queryClient
      .query(MetricService.getPredefinedQuery({ projectId }))
      .catch(noop);
  };
};
