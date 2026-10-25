import 'server-only';

import { MemberRole } from '@/generated/prisma/enums';
import { ActionError } from '@/server/common/run-action';

import { requireOrganizationAccess } from './require-organization-access';

export const requireOrganizationAdmin = async (organizationId: number) => {
  const access = await requireOrganizationAccess(organizationId);
  if (access.role !== MemberRole.admin) {
    throw new ActionError(
      'Only an admin can change the organization settings.',
      403,
    );
  }
  return access;
};
