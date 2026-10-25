import 'server-only';

import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import { requireOrganizationAccess } from '@/server/organization-settings/utils/require-organization-access';
import { listPhoneNumbersSchema } from '@/server/telephony-phone-numbers/schemas';
import type { PhoneNumberRow } from '@/server/telephony-phone-numbers/types';
import {
  phoneNumberRowSelect,
  toPhoneNumberRow,
} from '@/server/telephony-phone-numbers/utils/phone-number-row';

export const listPhoneNumbers = withValidation(
  listPhoneNumbersSchema,
  async ({ organizationId }): Promise<PhoneNumberRow[]> => {
    await requireOrganizationAccess(organizationId);
    const phoneNumbers = await prisma.telephonyPhoneNumber.findMany({
      where: { organizationId },
      orderBy: { id: 'asc' },
      select: phoneNumberRowSelect,
    });
    addEventFields({
      organization: { id: organizationId },
      phone_numbers: { count: phoneNumbers.length },
    });
    return phoneNumbers.map(toPhoneNumberRow);
  },
);
