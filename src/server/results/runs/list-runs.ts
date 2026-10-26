import 'server-only';

import type { z } from 'zod';

import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';
import { listRunsSchema } from '@/server/results/schemas';
import type { RunListPage } from '@/server/results/types';
import { listMetricColumns } from '@/server/results/utils/metric-columns';
import { runFilterWhere } from '@/server/results/utils/result-filter-where';
import {
  runOrderBy,
  runRowSelect,
  toRunRow,
} from '@/server/results/utils/run-row';

export const listRunPage = async ({
  projectId,
  resultId,
  filters,
  sortBy,
  sortDir,
  page,
  pageSize,
}: z.output<typeof listRunsSchema>): Promise<RunListPage> => {
  const where = runFilterWhere(projectId, resultId, filters);
  const [count, rows, metricColumns] = await Promise.all([
    prisma.run.count({ where }),
    prisma.run.findMany({
      where,
      select: runRowSelect,
      orderBy: runOrderBy(sortBy, sortDir),
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    listMetricColumns(projectId),
  ]);
  return { count, rows: rows.map(toRunRow), metricColumns };
};

export const listRuns = withValidation(listRunsSchema, async (input) => {
  await requireProjectAccess(input.projectId);
  const page = await listRunPage(input);
  addEventFields({
    result: { id: input.resultId },
    runs: {
      count: page.count,
      row_count: page.rows.length,
      page: input.page,
      page_size: input.pageSize,
    },
  });
  return page;
});
