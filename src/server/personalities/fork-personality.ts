import 'server-only';

import type { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import { forkPersonalitySchema } from '@/server/personalities/schemas';
import type { PersonalityRef } from '@/server/personalities/types';
import { visiblePersonalityWhere } from '@/server/personalities/utils/personality-access';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

const forkedSettingsSelect = {
  name: true,
  description: true,
  prompt: true,
  language: true,
  voice: true,
  accent: true,
  gender: true,
} satisfies Prisma.PersonalitySelect;

export const forkPersonality = withValidation(
  forkPersonalitySchema,
  async ({ projectId, personalityId }): Promise<PersonalityRef> => {
    await requireProjectAccess(projectId);
    const settings = await prisma.personality.findUniqueOrThrow({
      where: { id: personalityId, AND: [visiblePersonalityWhere(projectId)] },
      select: forkedSettingsSelect,
    });
    const created = await prisma.personality.create({
      data: {
        ...settings,
        projectId,
        forkedFromId: personalityId,
        enabledByDefault: false,
        projectEnablements: { create: { projectId } },
      },
      select: { id: true },
    });
    addEventFields({
      project: { id: projectId },
      personality: { id: created.id, forked_from_id: personalityId },
    });
    return created;
  },
);
