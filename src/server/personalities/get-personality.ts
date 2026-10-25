import 'server-only';

import { prisma } from '@/lib/prisma';
import { requireUser } from '@/server/auth';
import { withValidation } from '@/server/common/run-action';
import { personalityIdSchema } from '@/server/personalities/schemas';
import type { PersonalityDetail } from '@/server/personalities/types';
import { readablePersonalityWhere } from '@/server/personalities/utils/personality-access';
import { toPersonalityFormValues } from '@/server/personalities/utils/personality-data';

export const getPersonality = withValidation(
  personalityIdSchema,
  async ({ personalityId }): Promise<PersonalityDetail> => {
    const { user } = await requireUser();
    const personality = await prisma.personality.findUniqueOrThrow({
      where: { id: personalityId, AND: [readablePersonalityWhere(user.id)] },
    });
    return {
      id: personality.id,
      name: personality.name,
      isGlobal: personality.projectId === null,
      values: toPersonalityFormValues(personality),
    };
  },
);
