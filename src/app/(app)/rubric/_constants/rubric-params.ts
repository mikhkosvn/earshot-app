import { createLoader, parseAsInteger } from 'nuqs/server';

import { PROJECT_QUERY_KEY } from '@/lib/url-generator/constants';

export const loadRubricParams = createLoader({
  [PROJECT_QUERY_KEY]: parseAsInteger,
});
