import 'server-only';

import { ApiKeyLevel } from '@/server/api-keys/constants/api-key-level';

export const apiKeyLevel = (projectId: number | null): ApiKeyLevel => {
  if (projectId === null) return ApiKeyLevel.organization;
  return ApiKeyLevel.project;
};
