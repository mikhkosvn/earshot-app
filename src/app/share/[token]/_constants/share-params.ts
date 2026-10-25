import { createLoader, parseAsInteger } from 'nuqs/server';

import { DEFAULT_PAGE_SIZE } from '@/components/common/table-pagination/pagination-config';

export const RUN_PAGE_PARAM = 'runPage';

export const RUN_DETAIL_PARAM = 'call_id';

export const shareParsers = {
  [RUN_PAGE_PARAM]: parseAsInteger.withDefault(1),
  pageSize: parseAsInteger.withDefault(DEFAULT_PAGE_SIZE),
  [RUN_DETAIL_PARAM]: parseAsInteger,
};

export const loadShareParams = createLoader(shareParsers);
