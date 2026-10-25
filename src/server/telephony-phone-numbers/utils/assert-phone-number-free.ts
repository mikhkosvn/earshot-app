import 'server-only';

import { prisma } from '@/lib/prisma';
import { ActionError } from '@/server/common/run-action';

type PhoneNumberOwner = {
  organizationId: number;
  phoneNumber: string;
  exceptId?: number;
};

export const assertPhoneNumberFree = async ({
  organizationId,
  phoneNumber,
  exceptId,
}: PhoneNumberOwner) => {
  const existing = await prisma.telephonyPhoneNumber.findFirst({
    where: { organizationId, phoneNumber, id: { not: exceptId } },
    select: { id: true },
  });
  if (existing) {
    throw new ActionError('This phone number is already imported.', 409);
  }
};
