import 'server-only';

import { prisma } from '@/lib/prisma';
import { withValidation } from '@/server/common/run-action';
import { updateOrganizationSettingsSchema } from '@/server/organization-settings/schemas';
import { requireOrganizationAdmin } from '@/server/organization-settings/utils/require-organization-admin';

export const updateOrganizationSettings = withValidation(
  updateOrganizationSettingsSchema,
  async ({ organizationId, ...data }) => {
    await requireOrganizationAdmin(organizationId);
    return prisma.organization.update({
      where: { id: organizationId },
      data,
      select: { id: true, name: true },
    });
  },
);
