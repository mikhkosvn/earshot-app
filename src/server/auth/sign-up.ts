import 'server-only';

import { MemberRole } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { AuthFailureReason } from '@/server/auth/constants/auth-failure-reason';
import { signUpSchema } from '@/server/auth/schemas';
import { hashPassword } from '@/server/auth/utils/password';
import { startSession } from '@/server/auth/utils/start-session';
import { addEventFields } from '@/server/common/logging/event-fields';
import { ActionError, withValidation } from '@/server/common/run-action';
import {
  DEFAULT_ORGANIZATION_NAME,
  DEFAULT_PROJECT_NAME,
} from '@/server/projects/constants/default-project-name';
import { PROJECT_TRANSACTION_TIMEOUT_MS } from '@/server/projects/constants/project-transaction';
import { createProjectRecord } from '@/server/projects/utils/create-project-record';
import { setCurrentProjectCookie } from '@/server/projects/utils/current-project-cookie';

const organizationNameOrDefault = (name: string) => {
  if (name.length > 0) return name;
  return DEFAULT_ORGANIZATION_NAME;
};

export const signUp = withValidation(
  signUpSchema,
  async ({ name, email, password, organizationName }) => {
    const passwordHash = await hashPassword(password);

    const { userId, organizationId, projectId } = await prisma.$transaction(
      async (tx) => {
        const userCount = await tx.user.count();
        if (userCount > 0) {
          addEventFields({
            auth: { failure_reason: AuthFailureReason.signup_closed },
          });
          throw new ActionError(
            'Sign-up is closed. Sign in to your account.',
            403,
          );
        }

        const user = await tx.user.create({
          data: { name, email, passwordHash },
          select: { id: true },
        });
        const organization = await tx.organization.create({
          data: {
            name: organizationNameOrDefault(organizationName),
            members: { create: { userId: user.id, role: MemberRole.admin } },
          },
          select: { id: true },
        });
        const project = await createProjectRecord(tx, {
          organizationId: organization.id,
          name: DEFAULT_PROJECT_NAME,
        });

        return {
          userId: user.id,
          organizationId: organization.id,
          projectId: project.id,
        };
      },
      { timeout: PROJECT_TRANSACTION_TIMEOUT_MS },
    );

    await startSession(userId);
    addEventFields({
      user: { id: userId },
      organization: { id: organizationId },
      project: { id: projectId },
    });
    await setCurrentProjectCookie(projectId);
    return { userId, projectId };
  },
);
