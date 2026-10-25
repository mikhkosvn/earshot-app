import 'server-only';

import { withValidation } from '@/server/common/run-action';
import type { ResultDetail } from '@/server/results/types';
import { loadResultDetail } from '@/server/results/utils/detail/load-result-detail';
import { shareLinkTokenSchema } from '@/server/share-links/schemas';
import { requireShareLink } from '@/server/share-links/utils/resolve-share-link';

export const getSharedResult = withValidation(
  shareLinkTokenSchema,
  async ({ token }): Promise<ResultDetail> => {
    const link = await requireShareLink(token);
    if (link.resultId === null) {
      throw new Error('The share link does not point to a result.');
    }
    return loadResultDetail(link.resultId);
  },
);
