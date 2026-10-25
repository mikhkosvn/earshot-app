import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { CallerNumberMode, RunStatus } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import type {
  CreatedRunBatch,
  RunBatchSettings,
  RunPlanCase,
  TestProfileSnapshot,
} from '@/server/runs/types';
import { loadTestProfileSnapshots } from '@/server/runs/utils/test-profile-snapshot';
import { generateTestingNumber } from '@/server/runs/utils/testing-number';

const INSERT_TIMEOUT_MS = 60_000;

const testProfileIdsOf = (cases: RunPlanCase[]) =>
  cases.flatMap((item) => {
    if (item.testProfileId === null) return [];
    return [item.testProfileId];
  });

const snapshotInput = (snapshot: TestProfileSnapshot | undefined) => {
  if (!snapshot) return Prisma.DbNull;
  return snapshot as unknown as Prisma.InputJsonObject;
};

const callerNumberOf = (mode: CallerNumberMode, sharedNumber: string) => {
  if (mode === CallerNumberMode.different_numbers) {
    return generateTestingNumber();
  }
  return sharedNumber;
};

const latestAgentVersionId = async (agentId: number) => {
  const version = await prisma.agentVersion.findFirst({
    where: { agentId },
    orderBy: { version: Prisma.SortOrder.desc },
    select: { id: true },
  });
  return version?.id ?? null;
};

export const insertRunBatch = async (
  settings: RunBatchSettings,
  cases: RunPlanCase[],
): Promise<CreatedRunBatch> => {
  const testProfiles = await loadTestProfileSnapshots(
    settings.projectId,
    testProfileIdsOf(cases),
  );
  const agentVersionId = await latestAgentVersionId(settings.agentId);
  const sharedNumber = generateTestingNumber();

  return prisma.$transaction(
    async (tx) => {
      const result = await tx.result.create({
        data: {
          projectId: settings.projectId,
          agentId: settings.agentId,
          agentVersionId,
          name: settings.name,
          status: RunStatus.pending,
          createdVia: settings.source,
          createdById: settings.createdById,
          apiKeyId: settings.apiKeyId,
          frequency: settings.frequency,
          concurrencyLimit: settings.concurrencyLimit,
          callsPerSecond: settings.callsPerSecond,
          callerNumberMode: settings.callerNumberMode,
          agentNumber: settings.agentNumber,
        },
        select: { id: true },
      });
      if (settings.mockToolIds.length > 0) {
        await tx.resultMockTool.createMany({
          data: settings.mockToolIds.map((mockToolId) => ({
            resultId: result.id,
            mockToolId,
          })),
        });
      }
      if (settings.monitorRunId !== null) {
        await tx.monitorRun.update({
          where: { id: settings.monitorRunId },
          data: { resultId: result.id },
        });
      }
      const runIds: number[] = [];
      for (const item of cases) {
        const conversation = await tx.conversation.create({
          data: { projectId: settings.projectId },
          select: { id: true },
        });
        const run = await tx.run.create({
          data: {
            resultId: result.id,
            evaluatorId: item.evaluatorId,
            personalityId: item.personalityId,
            testProfileId: item.testProfileId,
            status: RunStatus.pending,
            callerNumber: callerNumberOf(
              settings.callerNumberMode,
              sharedNumber,
            ),
            evaluatorSnapshot:
              item.evaluatorSnapshot as unknown as Prisma.InputJsonObject,
            testProfileSnapshot: snapshotInput(
              testProfiles.get(item.testProfileId ?? 0),
            ),
            conversationId: conversation.id,
          },
          select: { id: true },
        });
        runIds.push(run.id);
      }
      return { resultId: result.id, runIds };
    },
    { timeout: INSERT_TIMEOUT_MS },
  );
};
