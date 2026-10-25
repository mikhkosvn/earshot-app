'use client';

import type { AlertRow } from '@/server/alerts/types';

import { useAlertFilterParams } from './params/use-alert-filter-params';
import { useAlertListQuery } from './queries/use-alert-list-query';

const matchesSearch = (alert: AlertRow, search: string) => {
  const term = search.trim().toLowerCase();
  if (!term) return true;
  return (
    alert.metric.name.toLowerCase().includes(term) ||
    alert.name.toLowerCase().includes(term)
  );
};

export const useFilteredAlerts = () => {
  const { data: alerts } = useAlertListQuery();
  const [{ search, scope, type }] = useAlertFilterParams();
  return alerts.filter(
    (alert) =>
      matchesSearch(alert, search) &&
      (scope === null || alert.metric.agentIds.includes(scope)) &&
      (type === null || alert.metric.evalType === type),
  );
};
