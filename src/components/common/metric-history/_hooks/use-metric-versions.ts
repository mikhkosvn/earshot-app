'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { EditMetricService } from '../_service';
import { useMetricId } from './use-metric-id';

export const useMetricVersions = () => {
  const metricId = useMetricId();
  const { data: versions } = useSuspenseQuery(
    EditMetricService.getVersionsQuery({ metricId }),
  );
  return versions;
};
