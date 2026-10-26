import 'server-only';

import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import { encryptSecret } from '@/server/crypto/encrypt-secret';
import { requireOrganizationAdmin } from '@/server/organization-settings/utils/require-organization-admin';
import { createPhoneNumberSchema } from '@/server/telephony-phone-numbers/schemas';
import { accountSidForProvider } from '@/server/telephony-phone-numbers/utils/account-sid-for-provider';
import { assertPhoneNumberFree } from '@/server/telephony-phone-numbers/utils/assert-phone-number-free';
import {
  phoneNumberRowSelect,
  toPhoneNumberRow,
} from '@/server/telephony-phone-numbers/utils/phone-number-row';

export const createPhoneNumber = withValidation(
  createPhoneNumberSchema,
  async ({ organizationId, accountSid, authToken, ...data }) => {
    const { user } = await requireOrganizationAdmin(organizationId);
    await assertPhoneNumberFree({
      organizationId,
      phoneNumber: data.phoneNumber,
    });
    const phoneNumber = await prisma.telephonyPhoneNumber.create({
      data: {
        ...data,
        organizationId,
        accountSid: accountSidForProvider(data.provider, accountSid),
        authTokenEncrypted: encryptSecret(authToken),
        importedById: user.id,
      },
      select: phoneNumberRowSelect,
    });
    addEventFields({
      organization: { id: organizationId },
      phone_number: { id: phoneNumber.id, provider: phoneNumber.provider },
    });
    return toPhoneNumberRow(phoneNumber);
  },
);
