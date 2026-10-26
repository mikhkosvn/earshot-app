import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import { projectScopeSchema } from '@/server/evaluators/schemas/evaluator-fields';
import type { PersonalityOption } from '@/server/evaluators/types';
import { enabledPersonalityWhere } from '@/server/evaluators/utils/evaluator-access-where';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

export const listPersonalityOptions = withValidation(
  projectScopeSchema,
  async ({ projectId }): Promise<PersonalityOption[]> => {
    await requireProjectAccess(projectId);
    const personalities = await prisma.personality.findMany({
      where: enabledPersonalityWhere(projectId),
      select: { id: true, name: true, language: true },
      orderBy: [{ name: Prisma.SortOrder.asc }, { id: Prisma.SortOrder.asc }],
    });
    addEventFields({
      project: { id: projectId },
      personalities: { count: personalities.length },
    });
    return personalities;
  },
);
