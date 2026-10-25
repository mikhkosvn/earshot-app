import 'server-only';

import { prisma } from '@/lib/prisma';
import { withValidation } from '@/server/common/run-action';
import { projectWebhookIdSchema } from '@/server/project-webhooks/schemas';
import type { ProjectWebhookSettings } from '@/server/project-webhooks/types';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

const EMPTY_WEBHOOK: ProjectWebhookSettings = {
  url: '',
  secretConfigured: false,
  notifications: [],
  redactionFields: [],
  skipCallsWithoutContent: false,
  forwardVapiWebhooks: true,
  forwardRetellWebhooks: true,
};

export const getProjectWebhook = withValidation(
  projectWebhookIdSchema,
  async ({ projectId }): Promise<ProjectWebhookSettings> => {
    await requireProjectAccess(projectId);
    const webhook = await prisma.projectWebhook.findUnique({
      where: { projectId },
      select: {
        url: true,
        secretEncrypted: true,
        skipCallsWithoutContent: true,
        forwardVapiWebhooks: true,
        forwardRetellWebhooks: true,
        notifications: { select: { notification: true } },
        redactionFields: { select: { field: true } },
      },
    });
    if (!webhook) return EMPTY_WEBHOOK;
    return {
      url: webhook.url,
      secretConfigured: webhook.secretEncrypted !== null,
      notifications: webhook.notifications.map((row) => row.notification),
      redactionFields: webhook.redactionFields.map((row) => row.field),
      skipCallsWithoutContent: webhook.skipCallsWithoutContent,
      forwardVapiWebhooks: webhook.forwardVapiWebhooks,
      forwardRetellWebhooks: webhook.forwardRetellWebhooks,
    };
  },
);
