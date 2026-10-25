import 'server-only';

import { prisma } from '@/lib/prisma';
import { requireUser } from '@/server/auth';
import { ActionError, withValidation } from '@/server/common/run-action';
import { updateCurrentUserSchema } from '@/server/users/schemas';

export const updateCurrentUser = withValidation(
  updateCurrentUserSchema,
  async ({ name, email }) => {
    const { user } = await requireUser();
    const owner = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });
    if (owner && owner.id !== user.id) {
      throw new ActionError('An account with this email already exists.', 409);
    }

    return prisma.user.update({
      where: { id: user.id },
      data: { name, email },
      select: { id: true, name: true, email: true },
    });
  },
);
