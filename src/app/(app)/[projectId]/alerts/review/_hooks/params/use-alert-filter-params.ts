'use client';

import { useQueryStates } from 'nuqs';

import { alertsPageParsers } from '../../_constants/alerts-params';

const filterParsers = {
  search: alertsPageParsers.search,
  scope: alertsPageParsers.scope,
  type: alertsPageParsers.type,
};

export const useAlertFilterParams = () => useQueryStates(filterParsers);
