import 'server-only';

import { prisma } from '@/lib/prisma';
import { withValidation } from '@/server/common/run-action';
import { setPersonalityEnabledSchema } from '@/server/personalities/schemas';
import { visiblePersonalityWhere } from '@/server/personalities/utils/personality-access';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

export const setPersonalityEnabled = withValidation(
  setPersonalityEnabledSchema,
  async ({ projectId, personalityId, enabled }) => {
    await requireProjectAccess(projectId);
    await prisma.personality.findUniqueOrThrow({
      where: { id: personalityId, AND: [visiblePersonalityWhere(projectId)] },
      select: { id: true },
    });
    if (enabled) {
      await prisma.projectPersonality.upsert({
        where: { projectId_personalityId: { projectId, personalityId } },
        create: { projectId, personalityId },
        update: {},
      });
      return { id: personalityId, enabled };
    }
    await prisma.projectPersonality.deleteMany({
      where: { projectId, personalityId },
    });
    return { id: personalityId, enabled };
  },
);
