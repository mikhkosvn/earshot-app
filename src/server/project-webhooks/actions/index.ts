'use server';

import type { ActionResult } from '@/lib/action-result';
import { runAction } from '@/server/common/run-action';
import { getProjectWebhook } from '@/server/project-webhooks/get-project-webhook';
import { saveProjectWebhook } from '@/server/project-webhooks/save-project-webhook';
import { testProjectWebhook } from '@/server/project-webhooks/test-project-webhook';
import type {
  ProjectWebhookIdInput,
  ProjectWebhookSettings,
  SaveProjectWebhookInput,
  TestProjectWebhookInput,
  TestProjectWebhookResult,
} from '@/server/project-webhooks/types';

export async function getProjectWebhookAction(
  args: ProjectWebhookIdInput,
): Promise<ProjectWebhookSettings> {
  return getProjectWebhook(args);
}

export async function saveProjectWebhookAction(
  args: SaveProjectWebhookInput,
): Promise<ActionResult<{ projectId: number }>> {
  return runAction(() => saveProjectWebhook(args));
}

export async function testProjectWebhookAction(
  args: TestProjectWebhookInput,
): Promise<ActionResult<TestProjectWebhookResult>> {
  return runAction(() => testProjectWebhook(args));
}
