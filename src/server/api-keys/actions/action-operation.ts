export const ApiKeysActionOperation = {
  listApiKeys: 'api_keys.list_api_keys',
  createApiKey: 'api_keys.create_api_key',
  deleteApiKey: 'api_keys.delete_api_key',
} as const;

export type ApiKeysActionOperation =
  (typeof ApiKeysActionOperation)[keyof typeof ApiKeysActionOperation];
