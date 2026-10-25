import 'server-only';

import { prisma } from '@/lib/prisma';
import { withValidation } from '@/server/common/run-action';
import type { RunDetail } from '@/server/results/types';
import { loadRunDetail } from '@/server/results/utils/run-detail';
import { sharedRunSchema } from '@/server/share-links/schemas';
import {
  requireShareLink,
  shareAllowsRun,
} from '@/server/share-links/utils/resolve-share-link';

export const getSharedRun = withValidation(
  sharedRunSchema,
  async ({ token, runId }): Promise<RunDetail> => {
    const link = await requireShareLink(token);
    const run = await prisma.run.findUniqueOrThrow({
      where: { id: runId },
      select: { id: true, resultId: true },
    });
    if (!shareAllowsRun(link, run)) {
      throw new Error('The share link does not include this run.');
    }
    return loadRunDetail(runId);
  },
);
