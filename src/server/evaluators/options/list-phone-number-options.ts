import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { withValidation } from '@/server/common/run-action';
import { projectScopeSchema } from '@/server/evaluators/schemas/evaluator-fields';
import type { PhoneNumberOption } from '@/server/evaluators/types';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

export const listPhoneNumberOptions = withValidation(
  projectScopeSchema,
  async ({ projectId }): Promise<PhoneNumberOption[]> => {
    const { project } = await requireProjectAccess(projectId);
    return prisma.telephonyPhoneNumber.findMany({
      where: { organizationId: project.organization.id },
      select: { id: true, phoneNumber: true, name: true },
      orderBy: { phoneNumber: Prisma.SortOrder.asc },
    });
  },
);
