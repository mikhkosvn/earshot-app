import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { TestProfileVariableSide } from '@/generated/prisma/enums';

export const publicTestProfileSelect = {
  id: true,
  projectId: true,
  agentId: true,
  name: true,
  createdById: true,
  updatedById: true,
  createdAt: true,
  updatedAt: true,
  agent: { select: { name: true } },
  variables: {
    select: { side: true, key: true, value: true },
    orderBy: { position: Prisma.SortOrder.asc },
  },
} satisfies Prisma.TestProfileSelect;

export type PublicTestProfileRow = Prisma.TestProfileGetPayload<{
  select: typeof publicTestProfileSelect;
}>;

const variablesObject = (
  row: PublicTestProfileRow,
  side: TestProfileVariableSide,
) =>
  Object.fromEntries(
    row.variables
      .filter((variable) => variable.side === side)
      .map((variable) => [variable.key, variable.value]),
  );

export const toPublicTestProfile = (row: PublicTestProfileRow) => ({
  id: row.id,
  project: row.projectId,
  agent: row.agentId,
  agent_name: row.agent.name,
  name: row.name,
  information: {
    main_agent_variables: variablesObject(
      row,
      TestProfileVariableSide.main_agent,
    ),
    testing_agent_variables: variablesObject(
      row,
      TestProfileVariableSide.testing_agent,
    ),
  },
  created_by: row.createdById,
  last_updated_by: row.updatedById,
  created_at: row.createdAt,
  updated_at: row.updatedAt,
});
