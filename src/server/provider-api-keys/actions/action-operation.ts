export const ProviderApiKeysActionOperation = {
  listProviderApiKeys: 'provider_api_keys.list_provider_api_keys',
  saveProviderApiKeys: 'provider_api_keys.save_provider_api_keys',
  deleteProviderApiKey: 'provider_api_keys.delete_provider_api_key',
} as const;

export type ProviderApiKeysActionOperation =
  (typeof ProviderApiKeysActionOperation)[keyof typeof ProviderApiKeysActionOperation];
