import 'server-only';

import { prisma } from '@/lib/prisma';
import { requireUser } from '@/server/auth';
import { withValidation } from '@/server/common/run-action';
import { testProfileIdSchema } from '@/server/test-profiles/schemas';
import { testProfileAccessWhere } from '@/server/test-profiles/utils/test-profile-access-where';

export const deleteTestProfile = withValidation(
  testProfileIdSchema,
  async ({ testProfileId }) => {
    const { user } = await requireUser();
    await prisma.testProfile.findUniqueOrThrow({
      where: { id: testProfileId, ...testProfileAccessWhere(user.id) },
      select: { id: true },
    });
    await prisma.testProfile.delete({ where: { id: testProfileId } });
    return { testProfileId };
  },
);
