import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { HistoryChangeType } from '@/generated/prisma/enums';
import {
  agentSnapshotInclude,
  describeSnapshotChange,
  toAgentSnapshot,
} from '@/server/agents/utils/agent-snapshot';

interface SaveAgentVersionArgs {
  agentId: number;
  userId: number;
  changeReason?: string;
  extraLabels?: string[];
}

export const saveAgentVersion = async (
  tx: Prisma.TransactionClient,
  { agentId, userId, changeReason, extraLabels = [] }: SaveAgentVersionArgs,
) => {
  const agent = await tx.agent.findUniqueOrThrow({
    where: { id: agentId },
    include: agentSnapshotInclude,
  });
  const snapshot = toAgentSnapshot(agent);
  const latest = await tx.agentVersion.findFirst({
    where: { agentId },
    orderBy: { version: Prisma.SortOrder.desc },
    select: { version: true, snapshot: true },
  });
  if (!latest) {
    return tx.agentVersion.create({
      data: {
        agentId,
        version: 1,
        changeType: HistoryChangeType.created,
        changeReason: changeReason ?? null,
        snapshot,
        createdById: userId,
      },
      select: { id: true, version: true },
    });
  }
  return tx.agentVersion.create({
    data: {
      agentId,
      version: latest.version + 1,
      changeType: HistoryChangeType.updated,
      changeReason:
        changeReason ??
        describeSnapshotChange(latest.snapshot, snapshot, extraLabels),
      snapshot,
      createdById: userId,
    },
    select: { id: true, version: true },
  });
};
