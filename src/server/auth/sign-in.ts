import 'server-only';

import { prisma } from '@/lib/prisma';
import { signInSchema } from '@/server/auth/schemas';
import { verifyPassword } from '@/server/auth/utils/password';
import { startSession } from '@/server/auth/utils/start-session';
import { ActionError, withValidation } from '@/server/common/run-action';

export const signIn = withValidation(
  signInSchema,
  async ({ email, password }) => {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, passwordHash: true },
    });
    const isValid =
      user !== null && (await verifyPassword(password, user.passwordHash));
    if (!user || !isValid) {
      throw new ActionError('The email or the password is not correct.', 401);
    }

    await startSession(user.id);
    return { userId: user.id };
  },
);
