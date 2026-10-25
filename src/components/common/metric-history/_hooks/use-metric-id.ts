'use client';

import { useParams } from 'next/navigation';

export const useMetricId = () => {
  const { metricId } = useParams<{ metricId: string }>();
  return Number(metricId);
};
