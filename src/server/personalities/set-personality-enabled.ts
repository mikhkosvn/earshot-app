import 'server-only';

import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
import { ActionError, withValidation } from '@/server/common/run-action';
import { setPersonalityEnabledSchema } from '@/server/personalities/schemas';
import { visiblePersonalityWhere } from '@/server/personalities/utils/personality-access';
import { projectDefaultPersonalityId } from '@/server/personalities/utils/project-default';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

export const setPersonalityEnabled = withValidation(
  setPersonalityEnabledSchema,
  async ({ projectId, personalityId, enabled }) => {
    await requireProjectAccess(projectId);
    await prisma.personality.findUniqueOrThrow({
      where: { id: personalityId, AND: [visiblePersonalityWhere(projectId)] },
      select: { id: true },
    });
    addEventFields({
      project: { id: projectId },
      personality: { id: personalityId, enabled },
    });
    if (enabled) {
      await prisma.projectPersonality.upsert({
        where: { projectId_personalityId: { projectId, personalityId } },
        create: { projectId, personalityId },
        update: {},
      });
      return { id: personalityId, enabled };
    }
    const defaultId = await projectDefaultPersonalityId(projectId);
    if (defaultId === personalityId) {
      throw new ActionError(
        'The default caller of a project cannot be disabled.',
        400,
      );
    }
    await prisma.projectPersonality.deleteMany({
      where: { projectId, personalityId },
    });
    return { id: personalityId, enabled };
  },
);
