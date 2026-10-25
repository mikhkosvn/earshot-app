import { queryOptions } from '@tanstack/react-query';

import { listProviderApiKeysAction } from '@/server/provider-api-keys/actions';

export const ProviderKeysKey = {
  list: 'provider-api-keys',
  save: 'save-provider-api-keys',
  delete: 'delete-provider-api-key',
} as const;

export type ProviderKeysKey =
  (typeof ProviderKeysKey)[keyof typeof ProviderKeysKey];

export class ProviderKeysService {
  static readonly saveKeysMutationKey = [ProviderKeysKey.save];
  static readonly deleteKeyMutationKey = [ProviderKeysKey.delete];

  static getKeysQuery(args: { projectId: number }) {
    return queryOptions({
      queryKey: [ProviderKeysKey.list, args],
      queryFn: () => listProviderApiKeysAction(args),
    });
  }
}
