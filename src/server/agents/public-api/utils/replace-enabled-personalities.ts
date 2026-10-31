import 'server-only';

import type { Prisma } from '@/generated/prisma/client';
import { throwFieldErrors } from '@/server/evaluators/public-api/utils/field-errors';
import { resolvePersonalityIds } from '@/server/personalities/public-api/public-personality-id';

const ENABLED_PERSONALITIES_FIELD = 'enabled_personalities';

export const resolveEnabledPersonalityIds = async (
  projectId: number,
  publicIds: number[],
) => {
  const uniquePublicIds = [...new Set(publicIds)];
  const resolved = await resolvePersonalityIds(projectId, uniquePublicIds);
  throwFieldErrors(
    uniquePublicIds
      .filter((publicId) => !resolved.has(publicId))
      .map((publicId) => ({
        field: ENABLED_PERSONALITIES_FIELD,
        message: `Personality ${publicId} does not exist.`,
      })),
  );
  return [...resolved.values()];
};

export const replaceEnabledPersonalities = async (
  tx: Prisma.TransactionClient,
  {
    projectId,
    agentId,
    personalityIds,
  }: { projectId: number; agentId: number; personalityIds: number[] },
) => {
  await tx.projectPersonality.createMany({
    data: personalityIds.map((personalityId) => ({ projectId, personalityId })),
    skipDuplicates: true,
  });
  await tx.agentPersonality.deleteMany({ where: { agentId } });
  await tx.agentPersonality.createMany({
    data: personalityIds.map((personalityId) => ({ agentId, personalityId })),
    skipDuplicates: true,
  });
};
