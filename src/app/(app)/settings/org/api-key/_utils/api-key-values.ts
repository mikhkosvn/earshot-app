import type { ActionResult } from '@/lib/action-result';
import { ApiKeyLevel } from '@/server/api-keys/constants/api-key-level';
import type { CreatedApiKey } from '@/server/api-keys/types/api-key-row';

const UNNAMED_KEY_LABEL = 'Private Key';

export const apiKeyLabel = (name: string) => {
  if (!name) return UNNAMED_KEY_LABEL;
  return name;
};

export const projectIdForLevel = (level: ApiKeyLevel, projectId: number) => {
  if (level === ApiKeyLevel.project) return projectId;
  return null;
};

export const createdPlainKey = (
  result: ActionResult<CreatedApiKey> | undefined,
) => {
  if (!result?.ok) return null;
  return result.data.plainKey;
};
