import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { TestProfileVariableSide } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { testProfileVariablesReaderSchema } from '@/server/runs/schemas';
import type { TestProfileSnapshot } from '@/server/runs/types';

const testProfileSnapshotSelect = {
  id: true,
  name: true,
  variables: {
    select: { side: true, key: true, value: true },
    orderBy: { position: Prisma.SortOrder.asc },
  },
} satisfies Prisma.TestProfileSelect;

type TestProfileSnapshotRow = Prisma.TestProfileGetPayload<{
  select: typeof testProfileSnapshotSelect;
}>;

const variablesOf = (
  row: TestProfileSnapshotRow,
  side: TestProfileVariableSide,
) =>
  Object.fromEntries(
    row.variables
      .filter((variable) => variable.side === side)
      .map((variable) => [variable.key, variable.value]),
  );

const toTestProfileSnapshot = (
  row: TestProfileSnapshotRow,
): TestProfileSnapshot => ({
  id: row.id,
  name: row.name,
  mainAgentVariables: variablesOf(row, TestProfileVariableSide.main_agent),
  testingAgentVariables: variablesOf(
    row,
    TestProfileVariableSide.testing_agent,
  ),
});

export const loadTestProfileSnapshots = async (
  projectId: number,
  testProfileIds: number[],
) => {
  const unique = [...new Set(testProfileIds)];
  if (unique.length === 0) return new Map<number, TestProfileSnapshot>();
  const rows = await prisma.testProfile.findMany({
    where: { id: { in: unique }, projectId },
    select: testProfileSnapshotSelect,
  });
  return new Map(rows.map((row) => [row.id, toTestProfileSnapshot(row)]));
};

export const readTestProfileVariables = (snapshot: Prisma.JsonValue | null) =>
  testProfileVariablesReaderSchema.parse(snapshot);
