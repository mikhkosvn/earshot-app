'use client';

import { parseAsInteger, useQueryStates } from 'nuqs';

import type { FilterNode } from '@/server/call-logs/types';

import { callListParsers } from '../../_constants/call-list-params';
import {
  parseFilterParam,
  serializeFilterParam,
} from '../../_utils/parse-filter-param';

const filterParsers = {
  filters: callListParsers.filters,
  page: parseAsInteger,
};

export const useCallFiltersParam = () => {
  const [{ filters }, setValues] = useQueryStates(filterParsers);

  const setConditions = (nodes: FilterNode[]) =>
    setValues({ filters: serializeFilterParam(nodes), page: null });

  return { conditions: parseFilterParam(filters), setConditions };
};
