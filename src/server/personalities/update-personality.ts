import 'server-only';

import { prisma } from '@/lib/prisma';
import { withValidation } from '@/server/common/run-action';
import { updatePersonalitySchema } from '@/server/personalities/schemas';
import type { PersonalityRef } from '@/server/personalities/types';
import { requireCustomPersonality } from '@/server/personalities/utils/personality-access';
import { personalityData } from '@/server/personalities/utils/personality-data';

export const updatePersonality = withValidation(
  updatePersonalitySchema,
  async ({ personalityId, values }): Promise<PersonalityRef> => {
    await requireCustomPersonality(personalityId);
    return prisma.personality.update({
      where: { id: personalityId },
      data: personalityData(values),
      select: { id: true },
    });
  },
);
