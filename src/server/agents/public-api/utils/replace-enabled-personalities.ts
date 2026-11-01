import 'server-only';

import type { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { throwFieldErrors } from '@/server/evaluators/public-api/utils/field-errors';
import { personalityForProjectWhere } from '@/server/evaluators/utils/evaluator-access-where';
import { ensureDefaultPersonalityId } from '@/server/personalities/utils/default-personality';

const ENABLED_PERSONALITIES_FIELD = 'enabled_personalities';

export const resolveEnabledPersonalityIds = async (
  projectId: number,
  personalityIds: number[],
) => {
  const uniqueIds = [...new Set(personalityIds)];
  const rows = await prisma.personality.findMany({
    where: { id: { in: uniqueIds }, ...personalityForProjectWhere(projectId) },
    select: { id: true },
  });
  const found = new Set(rows.map((row) => row.id));
  throwFieldErrors(
    uniqueIds
      .filter((personalityId) => !found.has(personalityId))
      .map((personalityId) => ({
        field: ENABLED_PERSONALITIES_FIELD,
        message: `Personality ${personalityId} does not exist.`,
      })),
  );
  return uniqueIds;
};

export const replaceEnabledPersonalities = async (
  tx: Prisma.TransactionClient,
  {
    projectId,
    agentId,
    personalityIds,
  }: { projectId: number; agentId: number; personalityIds: number[] },
) => {
  const defaultPersonalityId = await ensureDefaultPersonalityId(tx, projectId);
  const linkedIds = [...new Set([defaultPersonalityId, ...personalityIds])];
  await tx.projectPersonality.createMany({
    data: linkedIds.map((personalityId) => ({ projectId, personalityId })),
    skipDuplicates: true,
  });
  await tx.agentPersonality.deleteMany({ where: { agentId } });
  await tx.agentPersonality.createMany({
    data: linkedIds.map((personalityId) => ({ agentId, personalityId })),
    skipDuplicates: true,
  });
};
