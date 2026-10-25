import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { TestProfileVariableSide } from '@/generated/prisma/enums';
import type { TestProfileView } from '@/server/test-profiles/types';

export const testProfileViewSelect = {
  id: true,
  name: true,
  agentId: true,
  createdAt: true,
  updatedAt: true,
  agent: { select: { name: true, defaultTestProfileId: true } },
  createdBy: { select: { name: true } },
  updatedBy: { select: { name: true } },
  variables: {
    select: { side: true, key: true, value: true },
    orderBy: { position: Prisma.SortOrder.asc },
  },
  _count: { select: { evaluators: true } },
} satisfies Prisma.TestProfileSelect;

type TestProfileRow = Prisma.TestProfileGetPayload<{
  select: typeof testProfileViewSelect;
}>;

const variablesOf = (row: TestProfileRow, side: TestProfileVariableSide) =>
  row.variables
    .filter((variable) => variable.side === side)
    .map(({ key, value }) => ({ key, value }));

export const toTestProfileView = (row: TestProfileRow): TestProfileView => ({
  id: row.id,
  name: row.name,
  agentId: row.agentId,
  agentName: row.agent.name,
  isDefault: row.agent.defaultTestProfileId === row.id,
  mainAgentVariables: variablesOf(row, TestProfileVariableSide.main_agent),
  testingAgentVariables: variablesOf(
    row,
    TestProfileVariableSide.testing_agent,
  ),
  evaluatorCount: row._count.evaluators,
  createdAt: row.createdAt,
  createdByName: row.createdBy?.name ?? null,
  updatedAt: row.updatedAt,
  updatedByName: row.updatedBy?.name ?? null,
});
