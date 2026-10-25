import 'server-only';

import { prisma } from '@/lib/prisma';
import { withValidation } from '@/server/common/run-action';
import { encryptSecret } from '@/server/crypto/encrypt-secret';
import { saveProjectWebhookSchema } from '@/server/project-webhooks/schemas';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

export const saveProjectWebhook = withValidation(
  saveProjectWebhookSchema,
  async ({ projectId, secret, notifications, redactionFields, ...data }) => {
    await requireProjectAccess(projectId);
    const secretData = secret !== '' && {
      secretEncrypted: encryptSecret(secret),
    };
    await prisma.$transaction([
      prisma.projectWebhook.upsert({
        where: { projectId },
        create: { projectId, ...data, ...secretData },
        update: { ...data, ...secretData },
      }),
      prisma.projectWebhookNotification.deleteMany({ where: { projectId } }),
      prisma.projectWebhookNotification.createMany({
        data: notifications.map((notification) => ({
          projectId,
          notification,
        })),
        skipDuplicates: true,
      }),
      prisma.projectWebhookRedactionField.deleteMany({ where: { projectId } }),
      prisma.projectWebhookRedactionField.createMany({
        data: redactionFields.map((field) => ({ projectId, field })),
        skipDuplicates: true,
      }),
    ]);
    return { projectId };
  },
);
