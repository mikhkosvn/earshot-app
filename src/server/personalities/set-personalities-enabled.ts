import 'server-only';

import { prisma } from '@/lib/prisma';
import { withValidation } from '@/server/common/run-action';
import { setPersonalitiesEnabledSchema } from '@/server/personalities/schemas';
import {
  personalityLanguageWhere,
  visiblePersonalityWhere,
} from '@/server/personalities/utils/personality-access';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

export const setPersonalitiesEnabled = withValidation(
  setPersonalitiesEnabledSchema,
  async ({ projectId, language, enabled }) => {
    await requireProjectAccess(projectId);
    const personalities = await prisma.personality.findMany({
      where: {
        AND: [
          visiblePersonalityWhere(projectId),
          personalityLanguageWhere(language),
        ],
      },
      select: { id: true },
    });
    const personalityIds = personalities.map((personality) => personality.id);
    if (enabled) {
      await prisma.projectPersonality.createMany({
        data: personalityIds.map((personalityId) => ({
          projectId,
          personalityId,
        })),
        skipDuplicates: true,
      });
      return { count: personalityIds.length };
    }
    await prisma.projectPersonality.deleteMany({
      where: { projectId, personalityId: { in: personalityIds } },
    });
    return { count: personalityIds.length };
  },
);
