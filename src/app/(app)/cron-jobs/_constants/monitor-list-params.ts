import { createLoader, parseAsInteger } from 'nuqs/server';

import { DEFAULT_PAGE_SIZE } from '@/components/common/table-pagination/pagination-config';
import { PROJECT_QUERY_KEY } from '@/lib/url-generator/constants';

export const monitorListParsers = {
  [PROJECT_QUERY_KEY]: parseAsInteger,
  page: parseAsInteger.withDefault(1),
  pageSize: parseAsInteger.withDefault(DEFAULT_PAGE_SIZE),
};

export const loadMonitorListParams = createLoader(monitorListParsers);
