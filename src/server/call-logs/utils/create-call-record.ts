import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { CallProcessingStatus } from '@/generated/prisma/enums';
import type { TranscriptRole } from '@/generated/prisma/enums';

export interface NewCallTurn {
  role: TranscriptRole;
  content: string;
  startTime: number | null;
  endTime: number | null;
}

export interface NewCallRecord {
  projectId: number;
  agentId: number;
  externalCallId: string;
  customerNumber: string | null;
  startedAt: Date;
  endedReason: string | null;
  recordingFileId: string | null;
  metadata: Prisma.InputJsonObject;
  dynamicVariables: Prisma.InputJsonObject;
  turns: NewCallTurn[];
}

const currentVersionId = async (
  tx: Prisma.TransactionClient,
  agentId: number,
) => {
  const version = await tx.agentVersion.findFirst({
    where: { agentId },
    orderBy: { version: Prisma.SortOrder.desc },
    select: { id: true },
  });
  return version?.id ?? null;
};

export const createCallRecord = async (
  tx: Prisma.TransactionClient,
  record: NewCallRecord,
) => {
  const conversation = await tx.conversation.create({
    data: {
      projectId: record.projectId,
      recordingFileId: record.recordingFileId,
      startedAt: record.startedAt,
      endedReason: record.endedReason,
      metadata: record.metadata,
      dynamicVariables: record.dynamicVariables,
      providerCallId: record.externalCallId,
      turns: {
        create: record.turns.map((turn, position) => ({ position, ...turn })),
      },
    },
    select: { id: true },
  });
  return tx.callLog.create({
    data: {
      projectId: record.projectId,
      agentId: record.agentId,
      agentVersionId: await currentVersionId(tx, record.agentId),
      conversationId: conversation.id,
      externalCallId: record.externalCallId,
      customerNumber: record.customerNumber,
      status: CallProcessingStatus.pending,
    },
    select: { id: true },
  });
};
