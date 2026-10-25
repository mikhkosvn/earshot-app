import { createLoader, parseAsInteger, parseAsString } from 'nuqs/server';

import { DEFAULT_PAGE_SIZE } from '@/components/common/table-pagination/pagination-config';
import { callsParser } from '@/lib/url-generator/parsers';

export const CALL_LIST_DEFAULT_FROM = 'now-30d';

export const CALL_LIST_DEFAULT_TO = 'now';

export const callListParsers = {
  page: parseAsInteger.withDefault(1),
  pageSize: parseAsInteger.withDefault(DEFAULT_PAGE_SIZE),
  search: parseAsString.withDefault(''),
  view: callsParser.view,
  from: parseAsString.withDefault(CALL_LIST_DEFAULT_FROM),
  to: parseAsString.withDefault(CALL_LIST_DEFAULT_TO),
  filters: parseAsString.withDefault(''),
  callId: callsParser.callId,
};

export const loadCallListParams = createLoader(callListParsers);
