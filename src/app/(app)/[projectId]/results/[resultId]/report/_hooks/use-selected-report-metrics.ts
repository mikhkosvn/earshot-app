'use client';

import { useQueryStates } from 'nuqs';

import { resultReportParser } from '@/lib/url-generator/parsers';

import { useResultDetail } from '../../_hooks/use-result-detail';

export const useSelectedReportMetrics = () => {
  const result = useResultDetail();
  const [{ metrics }] = useQueryStates(resultReportParser);
  const selectedIds = metrics ?? [];
  return result.reportMetrics.filter((metric) =>
    selectedIds.includes(metric.metricId),
  );
};
