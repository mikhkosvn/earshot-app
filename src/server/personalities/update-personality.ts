import 'server-only';

import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import { updatePersonalitySchema } from '@/server/personalities/schemas';
import type { PersonalityRef } from '@/server/personalities/types';
import { requireCustomPersonality } from '@/server/personalities/utils/personality-access';
import { personalityData } from '@/server/personalities/utils/personality-data';

export const updatePersonality = withValidation(
  updatePersonalitySchema,
  async ({ personalityId, values }): Promise<PersonalityRef> => {
    await requireCustomPersonality(personalityId);
    const updated = await prisma.personality.update({
      where: { id: personalityId },
      data: personalityData(values),
      select: { id: true },
    });
    addEventFields({ personality: { id: updated.id } });
    return updated;
  },
);
