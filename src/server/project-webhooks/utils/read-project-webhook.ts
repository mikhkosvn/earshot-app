import 'server-only';

import { prisma } from '@/lib/prisma';
import { decryptSecret } from '@/server/crypto/decrypt-secret';

export type StoredProjectWebhook = NonNullable<
  Awaited<ReturnType<typeof readProjectWebhook>>
>;

export const readProjectWebhook = async (projectId: number) => {
  const webhook = await prisma.projectWebhook.findUnique({
    where: { projectId },
    select: {
      url: true,
      secretEncrypted: true,
      skipCallsWithoutContent: true,
      notifications: { select: { notification: true } },
      redactionFields: { select: { field: true } },
    },
  });
  if (!webhook) return null;
  return {
    url: webhook.url,
    secret: decryptOptionalSecret(webhook.secretEncrypted),
    skipCallsWithoutContent: webhook.skipCallsWithoutContent,
    notifications: webhook.notifications.map((row) => row.notification),
    redactionFields: webhook.redactionFields.map((row) => row.field),
  };
};

const decryptOptionalSecret = (secretEncrypted: string | null) => {
  if (!secretEncrypted) return null;
  return decryptSecret(secretEncrypted);
};
