import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import { listEvaluatorsSchema } from '@/server/evaluators/schemas/evaluator-list';
import type {
  EvaluatorListPage,
  EvaluatorListRow,
} from '@/server/evaluators/types';
import {
  evaluatorFilterWhere,
  evaluatorOrderBy,
} from '@/server/evaluators/utils/evaluator-filter-where';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

const listRowSelect = {
  id: true,
  name: true,
  agentId: true,
  language: true,
  instructions: true,
  expectedOutcomePrompt: true,
  createdAt: true,
  updatedAt: true,
  folder: { select: { path: true } },
  personality: { select: { name: true } },
  agent: { select: { name: true } },
  phoneNumber: { select: { phoneNumber: true } },
  testProfile: { select: { name: true } },
  createdBy: { select: { name: true } },
  updatedBy: { select: { name: true } },
  tags: {
    select: { tag: { select: { name: true } } },
    orderBy: { tag: { name: Prisma.SortOrder.asc } },
  },
  _count: { select: { metrics: true } },
} satisfies Prisma.EvaluatorSelect;

type ListRow = Prisma.EvaluatorGetPayload<{ select: typeof listRowSelect }>;

const toListRow = (row: ListRow): EvaluatorListRow => ({
  id: row.id,
  name: row.name,
  folderPath: row.folder?.path ?? null,
  personalityName: row.personality?.name ?? null,
  agentId: row.agentId,
  agentName: row.agent?.name ?? null,
  phoneNumber: row.phoneNumber?.phoneNumber ?? null,
  testProfileName: row.testProfile?.name ?? null,
  language: row.language,
  metricCount: row._count.metrics,
  tags: row.tags.map((entry) => entry.tag.name),
  instructions: row.instructions,
  expectedOutcomePrompt: row.expectedOutcomePrompt,
  createdAt: row.createdAt,
  createdByName: row.createdBy?.name ?? null,
  updatedAt: row.updatedAt,
  updatedByName: row.updatedBy?.name ?? null,
});

export const listEvaluators = withValidation(
  listEvaluatorsSchema,
  async ({ page, pageSize, sortBy, sortDir, ...filter }) => {
    await requireProjectAccess(filter.projectId);
    const where = evaluatorFilterWhere(filter);
    const [count, rows] = await prisma.$transaction([
      prisma.evaluator.count({ where }),
      prisma.evaluator.findMany({
        where,
        select: listRowSelect,
        orderBy: evaluatorOrderBy(sortBy, sortDir),
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
    ]);
    addEventFields({
      project: { id: filter.projectId },
      evaluators: { count: rows.length, total_count: count, page },
    });
    const result: EvaluatorListPage = { count, rows: rows.map(toListRow) };
    return result;
  },
);
