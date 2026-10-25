import 'server-only';

import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import { deletePhoneNumberSchema } from '@/server/telephony-phone-numbers/schemas';
import { findPhoneNumberForAdmin } from '@/server/telephony-phone-numbers/utils/find-phone-number-for-admin';

export const deletePhoneNumber = withValidation(
  deletePhoneNumberSchema,
  async ({ phoneNumberId }) => {
    const existing = await findPhoneNumberForAdmin(phoneNumberId);
    await prisma.telephonyPhoneNumber.delete({ where: { id: existing.id } });
    addEventFields({
      organization: { id: existing.organizationId },
      phone_number: { id: existing.id },
    });
    return { id: existing.id };
  },
);
