import 'server-only';

import { prisma } from '@/lib/prisma';
import { AuthFailureReason } from '@/server/auth/constants/auth-failure-reason';
import { signInSchema } from '@/server/auth/schemas';
import { verifyPassword } from '@/server/auth/utils/password';
import { startSession } from '@/server/auth/utils/start-session';
import { addEventFields } from '@/server/common/logging/event-fields';
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
      addEventFields({
        auth: { failure_reason: AuthFailureReason.invalid_credentials },
      });
      throw new ActionError('The email or the password is not correct.', 401);
    }

    await startSession(user.id);
    addEventFields({ user: { id: user.id } });
    return { userId: user.id };
  },
);
