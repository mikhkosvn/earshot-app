import 'server-only';

import { KeyManagementServiceClient } from '@google-cloud/kms';

const globalForKms = globalThis as unknown as {
  earshotKmsClient: KeyManagementServiceClient | undefined;
};

export const getKmsClient = () => {
  if (globalForKms.earshotKmsClient) return globalForKms.earshotKmsClient;
  const client = new KeyManagementServiceClient();
  globalForKms.earshotKmsClient = client;
  return client;
};
