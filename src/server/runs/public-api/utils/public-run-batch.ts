import 'server-only';

import { Prisma } from '@/generated/prisma/client';

export const publicRunBatchSelect = {
  id: true,
  name: true,
  agentId: true,
  status: true,
  createdVia: true,
  createdAt: true,
  runs: {
    orderBy: { id: Prisma.SortOrder.asc },
    select: { id: true, evaluatorId: true, callerNumber: true },
  },
} satisfies Prisma.ResultSelect;

type PublicRunBatchRow = Prisma.ResultGetPayload<{
  select: typeof publicRunBatchSelect;
}>;

export const toPublicRunBatch = (row: PublicRunBatchRow) => ({
  id: row.id,
  name: row.name,
  agent: row.agentId,
  status: row.status,
  success_rate: 0,
  run_as_text: false,
  created_via: row.createdVia,
  runs: row.runs.map((run) => ({
    id: run.id,
    scenario: run.evaluatorId,
    number: null,
    inbound_number: run.callerNumber,
    outbound_dial_window_opens_at: null,
    outbound_dial_window_seconds: null,
    outbound_dial_window_closes_at: null,
  })),
  created_at: row.createdAt,
});
