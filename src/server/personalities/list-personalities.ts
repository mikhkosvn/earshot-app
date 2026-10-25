import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { withValidation } from '@/server/common/run-action';
import { listPersonalitiesSchema } from '@/server/personalities/schemas';
import type { PersonalityListItem } from '@/server/personalities/types';
import {
  personalityLanguageWhere,
  visiblePersonalityWhere,
} from '@/server/personalities/utils/personality-access';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

const groupRank = (item: PersonalityListItem) => {
  if (!item.isGlobal) return 2;
  if (item.isStarred) return 0;
  return 1;
};

const compareItems = (
  left: PersonalityListItem,
  right: PersonalityListItem,
) => {
  const rankDifference = groupRank(left) - groupRank(right);
  if (rankDifference !== 0) return rankDifference;
  if (!left.isGlobal) {
    return right.createdAt.getTime() - left.createdAt.getTime();
  }
  return left.name.localeCompare(right.name);
};

export const listPersonalities = withValidation(
  listPersonalitiesSchema,
  async ({ projectId, language }): Promise<PersonalityListItem[]> => {
    await requireProjectAccess(projectId);
    const rows = await prisma.personality.findMany({
      where: {
        AND: [
          visiblePersonalityWhere(projectId),
          personalityLanguageWhere(language),
        ],
      },
      orderBy: { id: Prisma.SortOrder.asc },
      select: {
        id: true,
        name: true,
        description: true,
        language: true,
        accent: true,
        gender: true,
        isStarred: true,
        projectId: true,
        forkedFromId: true,
        backgroundNoise: true,
        interruptionLevel: true,
        speed: true,
        createdAt: true,
        projectEnablements: {
          where: { projectId },
          select: { projectId: true },
        },
      },
    });
    return rows
      .map(({ projectEnablements, projectId: ownerId, ...row }) => ({
        ...row,
        isGlobal: ownerId === null,
        enabled: projectEnablements.length > 0,
      }))
      .sort(compareItems);
  },
);
