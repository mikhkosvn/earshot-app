import 'server-only';

import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import { encryptSecret } from '@/server/crypto/encrypt-secret';
import { updatePhoneNumberSchema } from '@/server/telephony-phone-numbers/schemas';
import { accountSidForProvider } from '@/server/telephony-phone-numbers/utils/account-sid-for-provider';
import { assertPhoneNumberFree } from '@/server/telephony-phone-numbers/utils/assert-phone-number-free';
import { findPhoneNumberForAdmin } from '@/server/telephony-phone-numbers/utils/find-phone-number-for-admin';
import {
  phoneNumberRowSelect,
  toPhoneNumberRow,
} from '@/server/telephony-phone-numbers/utils/phone-number-row';

export const updatePhoneNumber = withValidation(
  updatePhoneNumberSchema,
  async ({ phoneNumberId, accountSid, authToken, ...data }) => {
    const existing = await findPhoneNumberForAdmin(phoneNumberId);
    await assertPhoneNumberFree({
      organizationId: existing.organizationId,
      phoneNumber: data.phoneNumber,
      exceptId: existing.id,
    });
    const phoneNumber = await prisma.telephonyPhoneNumber.update({
      where: { id: existing.id },
      data: {
        ...data,
        accountSid: accountSidForProvider(data.provider, accountSid),
        ...(authToken && { authTokenEncrypted: encryptSecret(authToken) }),
      },
      select: phoneNumberRowSelect,
    });
    addEventFields({
      organization: { id: existing.organizationId },
      phone_number: {
        id: phoneNumber.id,
        provider: phoneNumber.provider,
        auth_token_changed: Boolean(authToken),
      },
    });
    return toPhoneNumberRow(phoneNumber);
  },
);
