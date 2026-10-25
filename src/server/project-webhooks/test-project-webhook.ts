import 'server-only';

import { ActionError, withValidation } from '@/server/common/run-action';
import { testProjectWebhookSchema } from '@/server/project-webhooks/schemas';
import type { TestProjectWebhookResult } from '@/server/project-webhooks/types';
import { buildMockWebhookPayload } from '@/server/project-webhooks/utils/build-mock-webhook-payload';
import { postProjectWebhook } from '@/server/project-webhooks/utils/post-project-webhook';
import { readProjectWebhook } from '@/server/project-webhooks/utils/read-project-webhook';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

export const testProjectWebhook = withValidation(
  testProjectWebhookSchema,
  async ({ projectId, notification }): Promise<TestProjectWebhookResult> => {
    await requireProjectAccess(projectId);
    const webhook = await readProjectWebhook(projectId);
    if (!webhook?.url) {
      throw new ActionError('Save a webhook URL before you send a test.');
    }
    const delivery = await postProjectWebhook({
      webhook,
      ...buildMockWebhookPayload(notification),
    });
    if (delivery.status === null) {
      throw new ActionError(
        `The test webhook was not delivered. ${delivery.error ?? ''}`.trim(),
        502,
      );
    }
    if (!delivery.ok) {
      throw new ActionError(
        `The endpoint answered with status ${delivery.status}.`,
        502,
      );
    }
    return { status: delivery.status, durationMs: delivery.durationMs };
  },
);
