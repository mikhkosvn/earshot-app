'use client';

import { useState } from 'react';

import { useResultDetail } from '../use-result-detail';

export const useReportMetricSelection = () => {
  const result = useResultDetail();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const toggle = (metricId: number, checked: boolean) => {
    setSelectedIds((current) => {
      const others = current.filter((id) => id !== metricId);
      if (!checked) return others;
      return [...others, metricId];
    });
  };

  const selectAll = () =>
    setSelectedIds(result.reportMetrics.map((metric) => metric.metricId));

  const clearAll = () => setSelectedIds([]);

  return { selectedIds, toggle, selectAll, clearAll };
};
