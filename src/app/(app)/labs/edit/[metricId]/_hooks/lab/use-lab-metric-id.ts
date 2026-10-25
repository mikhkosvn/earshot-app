'use client';

import { useParams } from 'next/navigation';

export const useLabMetricId = () => {
  const { metricId } = useParams<{ metricId: string }>();
  return Number(metricId);
};
