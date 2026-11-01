import 'server-only';

import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import { createPersonalitySchema } from '@/server/personalities/schemas';
import type { PersonalityRef } from '@/server/personalities/types';
import { personalityData } from '@/server/personalities/utils/personality-data';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

export const createPersonality = withValidation(
  createPersonalitySchema,
  async ({ projectId, values }): Promise<PersonalityRef> => {
    await requireProjectAccess(projectId);
    const data = personalityData(values);
    const created = await prisma.personality.create({
      data: {
        ...data,
        projectId,
        enabledByDefault: false,
        projectEnablements: { create: { projectId } },
      },
      select: { id: true },
    });
    addEventFields({
      project: { id: projectId },
      personality: { id: created.id, language: data.language },
    });
    return created;
  },
);
