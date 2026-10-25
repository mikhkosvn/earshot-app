import { createLoader, parseAsInteger, parseAsString } from 'nuqs/server';

import { DEFAULT_PAGE_SIZE } from '@/components/common/table-pagination/pagination-config';
import { PROJECT_QUERY_KEY } from '@/lib/url-generator/constants';

export const AGENT_SEARCH_PARAM = 'search';

export const agentListParsers = {
  [PROJECT_QUERY_KEY]: parseAsInteger,
  page: parseAsInteger.withDefault(1),
  pageSize: parseAsInteger.withDefault(DEFAULT_PAGE_SIZE),
  [AGENT_SEARCH_PARAM]: parseAsString.withDefault(''),
};

export const loadAgentListParams = createLoader(agentListParsers);
