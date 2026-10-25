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
import { ApiKeysActionOperation } from '@/server/api-keys/actions/action-operation';
import { withActionEvent } from '@/server/common/logging/with-action-event';

export async function listApiKeysAction(
  args: ListApiKeysInput,
): Promise<ApiKeyRow[]> {
  return withActionEvent(ApiKeysActionOperation.listApiKeys, () =>
    listApiKeys(args),
  );
}

export async function createApiKeyAction(
  args: CreateApiKeyInput,
): Promise<ActionResult<CreatedApiKey>> {
  return withActionEvent(ApiKeysActionOperation.createApiKey, () =>
    runAction(() => createApiKey(args)),
  );
}

export async function deleteApiKeyAction(
  args: DeleteApiKeyInput,
): Promise<ActionResult<{ id: number }>> {
  return withActionEvent(ApiKeysActionOperation.deleteApiKey, () =>
    runAction(() => deleteApiKey(args)),
  );
}
