import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { withValidation } from '@/server/common/run-action';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';
import { listResultsSchema } from '@/server/results/schemas';
import type { ResultListPage } from '@/server/results/types';
import { resultFilterWhere } from '@/server/results/utils/result-filter-where';
import {
  resultRowSelect,
  toResultListRow,
} from '@/server/results/utils/result-row';

export const listResults = withValidation(
  listResultsSchema,
  async ({ projectId, filters, page, pageSize }): Promise<ResultListPage> => {
    await requireProjectAccess(projectId);
    const where = resultFilterWhere(projectId, filters);
    const [count, rows] = await prisma.$transaction([
      prisma.result.count({ where }),
      prisma.result.findMany({
        where,
        select: resultRowSelect,
        orderBy: [
          { createdAt: Prisma.SortOrder.desc },
          { id: Prisma.SortOrder.desc },
        ],
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
    ]);
    return { count, rows: rows.map(toResultListRow) };
  },
);
