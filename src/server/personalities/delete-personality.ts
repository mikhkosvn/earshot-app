import 'server-only';

import { prisma } from '@/lib/prisma';
import { withValidation } from '@/server/common/run-action';
import { personalityIdSchema } from '@/server/personalities/schemas';
import type { PersonalityRef } from '@/server/personalities/types';
import { requireCustomPersonality } from '@/server/personalities/utils/personality-access';

export const deletePersonality = withValidation(
  personalityIdSchema,
  async ({ personalityId }): Promise<PersonalityRef> => {
    await requireCustomPersonality(personalityId);
    return prisma.personality.delete({
      where: { id: personalityId },
      select: { id: true },
    });
  },
);
