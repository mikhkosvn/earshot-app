import 'server-only';

import { prisma } from '@/lib/prisma';
import { requireUser } from '@/server/auth';
import { requireOrganizationAdmin } from '@/server/organization-settings/utils/require-organization-admin';

export const findPhoneNumberForAdmin = async (phoneNumberId: number) => {
  const { user } = await requireUser();
  const phoneNumber = await prisma.telephonyPhoneNumber.findUniqueOrThrow({
    where: {
      id: phoneNumberId,
      organization: { members: { some: { userId: user.id } } },
    },
    select: { id: true, organizationId: true },
  });
  await requireOrganizationAdmin(phoneNumber.organizationId);
  return phoneNumber;
};
