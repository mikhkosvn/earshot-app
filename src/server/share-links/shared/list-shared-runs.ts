import 'server-only';

import { prisma } from '@/lib/prisma';
import { withValidation } from '@/server/common/run-action';
import {
  RunSortField,
  SortDirection,
} from '@/server/results/constants/result-list';
import { listRunPage } from '@/server/results/runs/list-runs';
import type { RunListPage } from '@/server/results/types';
import { sharedRunsSchema } from '@/server/share-links/schemas';
import { requireShareLink } from '@/server/share-links/utils/resolve-share-link';

const NO_FILTERS = {
  agentIds: [],
  evaluatorIds: [],
  tags: [],
  statuses: [],
  evaluationStatuses: [],
};

export const listSharedRuns = withValidation(
  sharedRunsSchema,
  async ({ token, page, pageSize }): Promise<RunListPage> => {
    const link = await requireShareLink(token);
    if (link.resultId === null) {
      throw new Error('The share link does not point to a result.');
    }
    const result = await prisma.result.findUniqueOrThrow({
      where: { id: link.resultId },
      select: { projectId: true },
    });
    return listRunPage({
      projectId: result.projectId,
      resultId: link.resultId,
      filters: NO_FILTERS,
      sortBy: RunSortField.id,
      sortDir: SortDirection.asc,
      page,
      pageSize,
    });
  },
);
