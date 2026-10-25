import { queryOptions } from '@tanstack/react-query';

import { listApiKeysAction } from '@/server/api-keys/actions';

export const ApiKeyKey = {
  list: 'api-keys',
  create: 'create-api-key',
  delete: 'delete-api-key',
} as const;

export type ApiKeyKey = (typeof ApiKeyKey)[keyof typeof ApiKeyKey];

export class ApiKeyService {
  static readonly createApiKeyMutationKey = [ApiKeyKey.create];
  static readonly deleteApiKeyMutationKey = [ApiKeyKey.delete];

  static getApiKeysQuery(args: { organizationId: number }) {
    return queryOptions({
      queryKey: [ApiKeyKey.list, args],
      queryFn: () => listApiKeysAction(args),
    });
  }
}
