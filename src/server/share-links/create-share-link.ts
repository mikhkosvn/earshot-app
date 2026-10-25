import 'server-only';

import { randomBytes } from 'node:crypto';

import { ShareLinkTarget } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { withValidation } from '@/server/common/run-action';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';
import { createShareLinkSchema } from '@/server/share-links/schemas';
import type { CreatedShareLink } from '@/server/share-links/types';

const TOKEN_BYTES = 24;

interface TargetFields {
  resultId?: number;
  runId?: number;
  callLogId?: number;
}

const targetWhere = (
  target: ShareLinkTarget,
  targetId: number,
): TargetFields => {
  if (target === ShareLinkTarget.result) return { resultId: targetId };
  if (target === ShareLinkTarget.run) return { runId: targetId };
  return { callLogId: targetId };
};

const assertTargetInProject = async (
  projectId: number,
  target: ShareLinkTarget,
  targetId: number,
) => {
  if (target === ShareLinkTarget.result) {
    await prisma.result.findUniqueOrThrow({
      where: { id: targetId, projectId },
      select: { id: true },
    });
    return;
  }
  if (target === ShareLinkTarget.run) {
    await prisma.run.findUniqueOrThrow({
      where: { id: targetId, result: { projectId } },
      select: { id: true },
    });
    return;
  }
  await prisma.callLog.findUniqueOrThrow({
    where: { id: targetId, projectId },
    select: { id: true },
  });
};

export const createShareLink = withValidation(
  createShareLinkSchema,
  async ({ projectId, target, targetId }): Promise<CreatedShareLink> => {
    const { user } = await requireProjectAccess(projectId);
    await assertTargetInProject(projectId, target, targetId);
    const where = targetWhere(target, targetId);
    const existing = await prisma.shareLink.findFirst({
      where: { ...where, projectId, target, revokedAt: null, expiresAt: null },
      select: { token: true },
    });
    if (existing) return existing;
    return prisma.shareLink.create({
      data: {
        ...where,
        projectId,
        target,
        token: randomBytes(TOKEN_BYTES).toString('base64url'),
        createdById: user.id,
      },
      select: { token: true },
    });
  },
);
