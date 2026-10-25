'use client';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';

import { MetricService } from '../_service';
import { useViewParam } from './use-view-param';

export const useMetricListQuery = () => {
  const projectId = useCurrentProjectId();
  const { viewId } = useViewParam();
  return MetricService.getListQuery({ projectId, viewId });
};
