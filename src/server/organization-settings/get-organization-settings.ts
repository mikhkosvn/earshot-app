import 'server-only';

import { prisma } from '@/lib/prisma';
import { withValidation } from '@/server/common/run-action';
import { organizationIdSchema } from '@/server/organization-settings/schemas';
import type { OrganizationSettings } from '@/server/organization-settings/types';
import { requireOrganizationAccess } from '@/server/organization-settings/utils/require-organization-access';

export const getOrganizationSettings = withValidation(
  organizationIdSchema,
  async ({ organizationId }): Promise<OrganizationSettings> => {
    const { role } = await requireOrganizationAccess(organizationId);
    const organization = await prisma.organization.findUniqueOrThrow({
      where: { id: organizationId },
      select: {
        id: true,
        name: true,
        teamSize: true,
        maxConcurrentRuns: true,
        allowDuplicateCallIds: true,
        restrictNumbersToOwnImports: true,
        projects: {
          orderBy: { id: 'asc' },
          select: { id: true, name: true, createdAt: true },
        },
      },
    });
    return { ...organization, role };
  },
);
