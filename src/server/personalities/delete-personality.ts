import 'server-only';

import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
import { ActionError, withValidation } from '@/server/common/run-action';
import { personalityIdSchema } from '@/server/personalities/schemas';
import type { PersonalityRef } from '@/server/personalities/types';
import { requireCustomPersonality } from '@/server/personalities/utils/personality-access';
import { projectDefaultPersonalityId } from '@/server/personalities/utils/project-default';

export const deletePersonality = withValidation(
  personalityIdSchema,
  async ({ personalityId }): Promise<PersonalityRef> => {
    const { personality } = await requireCustomPersonality(personalityId);
    const defaultId = await projectDefaultPersonalityId(personality.projectId);
    if (defaultId === personalityId) {
      throw new ActionError(
        'The default caller of a project cannot be deleted.',
        400,
      );
    }
    const deleted = await prisma.personality.delete({
      where: { id: personalityId },
      select: { id: true },
    });
    addEventFields({ personality: { id: deleted.id } });
    return deleted;
  },
);
