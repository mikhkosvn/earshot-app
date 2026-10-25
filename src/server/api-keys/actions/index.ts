'use server';

import type { ActionResult } from '@/lib/action-result';
import { createApiKey } from '@/server/api-keys/create-api-key';
import { deleteApiKey } from '@/server/api-keys/delete-api-key';
import { listApiKeys } from '@/server/api-keys/list-api-keys';
import type {
  ApiKeyRow,
  CreateApiKeyInput,
  CreatedApiKey,
  DeleteApiKeyInput,
  ListApiKeysInput,
} from '@/server/api-keys/types/api-key-row';
import { runAction } from '@/server/common/run-action';

export async function listApiKeysAction(
  args: ListApiKeysInput,
): Promise<ApiKeyRow[]> {
  return listApiKeys(args);
}

export async function createApiKeyAction(
  args: CreateApiKeyInput,
): Promise<ActionResult<CreatedApiKey>> {
  return runAction(() => createApiKey(args));
}

export async function deleteApiKeyAction(
  args: DeleteApiKeyInput,
): Promise<ActionResult<{ id: number }>> {
  return runAction(() => deleteApiKey(args));
}
