import 'server-only';

import { withValidation } from '@/server/common/run-action';
import { shareLinkTokenSchema } from '@/server/share-links/schemas';
import type { SharedView } from '@/server/share-links/types';
import { findShareLink } from '@/server/share-links/utils/resolve-share-link';

export const getSharedView = withValidation(
  shareLinkTokenSchema,
  async ({ token }): Promise<SharedView | null> => {
    const link = await findShareLink(token);
    if (!link) return null;
    return {
      target: link.target,
      resultId: link.resultId,
      runId: link.runId,
      callLogId: link.callLogId,
      conversationId:
        link.run?.conversationId ?? link.callLog?.conversationId ?? null,
    };
  },
);
