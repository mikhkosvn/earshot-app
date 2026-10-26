'use server';

import type { ProviderKeyProvider } from '@/generated/prisma/enums';
import type { ActionResult } from '@/lib/action-result';
import { runAction } from '@/server/common/run-action';
import { deleteProviderApiKey } from '@/server/provider-api-keys/delete-provider-api-key';
import { listProviderApiKeys } from '@/server/provider-api-keys/list-provider-api-keys';
import { saveProviderApiKeys } from '@/server/provider-api-keys/save-provider-api-keys';
import type {
  DeleteProviderApiKeyInput,
  ListProviderApiKeysInput,
  ProviderApiKeyState,
  SaveProviderApiKeysInput,
} from '@/server/provider-api-keys/types';
import { ProviderApiKeysActionOperation } from '@/server/provider-api-keys/actions/action-operation';
import { withActionEvent } from '@/server/common/logging/with-action-event';

export async function listProviderApiKeysAction(
  args: ListProviderApiKeysInput,
): Promise<ProviderApiKeyState[]> {
  return withActionEvent(
    ProviderApiKeysActionOperation.listProviderApiKeys,
    () => listProviderApiKeys(args),
  );
}

export async function saveProviderApiKeysAction(
  args: SaveProviderApiKeysInput,
): Promise<ActionResult<{ projectId: number; savedCount: number }>> {
  return withActionEvent(
    ProviderApiKeysActionOperation.saveProviderApiKeys,
    () => runAction(() => saveProviderApiKeys(args)),
  );
}

export async function deleteProviderApiKeyAction(
  args: DeleteProviderApiKeyInput,
): Promise<ActionResult<{ projectId: number; provider: ProviderKeyProvider }>> {
  return withActionEvent(
    ProviderApiKeysActionOperation.deleteProviderApiKey,
    () => runAction(() => deleteProviderApiKey(args)),
  );
}
