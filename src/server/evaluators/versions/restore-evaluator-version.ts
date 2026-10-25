import 'server-only';

import type { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { requireUser } from '@/server/auth';
import { ActionError, withValidation } from '@/server/common/run-action';
import {
  evaluatorFieldsSchema,
  evaluatorSnapshotSchema,
  restoreEvaluatorVersionSchema,
} from '@/server/evaluators/schemas/evaluator-fields';
import type { EvaluatorSnapshot } from '@/server/evaluators/types';
import { evaluatorAccessWhere } from '@/server/evaluators/utils/evaluator-access-where';
import { toEvaluatorDetail } from '@/server/evaluators/utils/evaluator-detail';
import { recordEvaluatorVersion } from '@/server/evaluators/utils/record-evaluator-version';
import { updateEvaluatorRecord } from '@/server/evaluators/utils/write-evaluator';

const existingMetricIds = async (
  tx: Prisma.TransactionClient,
  projectId: number,
  metricIds: number[],
) => {
  const metrics = await tx.metric.findMany({
    where: { projectId, id: { in: metricIds } },
    select: { id: true },
  });
  return metrics.map((metric) => metric.id);
};

const existingFolderPath = async (
  tx: Prisma.TransactionClient,
  projectId: number,
  snapshot: EvaluatorSnapshot,
  currentPath: string,
) => {
  if (!snapshot.folderPath) return currentPath;
  const folder = await tx.folder.findUnique({
    where: { projectId_path: { projectId, path: snapshot.folderPath } },
    select: { path: true },
  });
  return folder?.path ?? currentPath;
};

const existingTestProfileId = async (
  tx: Prisma.TransactionClient,
  snapshot: EvaluatorSnapshot,
) => {
  if (!snapshot.testProfileId) return null;
  const profile = await tx.testProfile.findFirst({
    where: { id: snapshot.testProfileId, agentId: snapshot.agentId ?? -1 },
    select: { id: true },
  });
  return profile?.id ?? null;
};

export const restoreEvaluatorVersion = withValidation(
  restoreEvaluatorVersionSchema,
  async ({ evaluatorId, versionId }) => {
    const { user } = await requireUser();
    return prisma.$transaction(async (tx) => {
      const evaluator = await tx.evaluator.findUniqueOrThrow({
        where: { id: evaluatorId, ...evaluatorAccessWhere(user.id) },
        select: { projectId: true, folder: { select: { path: true } } },
      });
      const version = await tx.evaluatorVersion.findFirstOrThrow({
        where: { id: versionId, evaluatorId },
        select: { version: true, snapshot: true },
      });
      const snapshot = evaluatorSnapshotSchema.parse(version.snapshot);
      if (!snapshot.agentId || !snapshot.personalityId) {
        throw new ActionError(
          'This version has no agent or personality. It cannot be restored.',
        );
      }
      const fields = evaluatorFieldsSchema.parse({
        ...snapshot,
        agentId: snapshot.agentId,
        personalityId: snapshot.personalityId,
        folderPath: await existingFolderPath(
          tx,
          evaluator.projectId,
          snapshot,
          evaluator.folder?.path ?? '',
        ),
        testProfileId: await existingTestProfileId(tx, snapshot),
        metricIds: await existingMetricIds(
          tx,
          evaluator.projectId,
          snapshot.metricIds,
        ),
        expectedToolCalls: snapshot.expectedToolCalls.map((call) => ({
          mockToolId: call.mockToolId,
          input: call.input,
          output: call.output,
        })),
      });
      await updateEvaluatorRecord(tx, {
        projectId: evaluator.projectId,
        evaluatorId,
        userId: user.id,
        fields,
      });
      const row = await recordEvaluatorVersion(tx, {
        evaluatorId,
        userId: user.id,
        changeReason: `Restored from v${version.version}`,
      });
      return toEvaluatorDetail(row);
    });
  },
);
