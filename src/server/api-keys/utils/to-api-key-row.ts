import 'server-only';

import {
  API_KEY_PREFIX,
  API_KEY_RANDOM_LENGTH,
} from '@/server/api-keys/constants';
import type { ApiKeyRow } from '@/server/api-keys/types/api-key-row';

const KEY_LENGTH = API_KEY_PREFIX.length + API_KEY_RANDOM_LENGTH;

export const apiKeyRowSelect = {
  id: true,
  name: true,
  keyPrefix: true,
  projectId: true,
  createdAt: true,
  project: { select: { name: true } },
} as const;

interface ApiKeyRecord {
  id: number;
  name: string;
  keyPrefix: string;
  projectId: number | null;
  createdAt: Date;
  project: { name: string } | null;
}

export const toApiKeyRow = (record: ApiKeyRecord): ApiKeyRow => ({
  id: record.id,
  name: record.name,
  maskedKey: record.keyPrefix.padEnd(KEY_LENGTH, '*'),
  projectId: record.projectId,
  projectName: record.project?.name ?? null,
  createdAt: record.createdAt,
});
