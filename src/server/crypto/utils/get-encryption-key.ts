import 'server-only';

import { createHash } from 'node:crypto';

import { addEventFields } from '@/server/common/logging/event-fields';

const DEVELOPMENT_KEY_SEED = 'earshot-development-encryption-key';
const KEY_LENGTH_BYTES = 32;

const globalForCrypto = globalThis as unknown as {
  earshotEncryptionKey: Buffer | undefined;
};

const readConfiguredKey = (value: string) => {
  const key = Buffer.from(value, 'base64');
  if (key.length !== KEY_LENGTH_BYTES) {
    throw new Error('ENCRYPTION_KEY must be 32 bytes in base64.');
  }
  return key;
};

const deriveDevelopmentKey = () => {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('ENCRYPTION_KEY is not set.');
  }
  addEventFields({ encryption: { development_key: true } });
  return createHash('sha256').update(DEVELOPMENT_KEY_SEED).digest();
};

const loadKey = () => {
  const value = process.env.ENCRYPTION_KEY;
  if (value) return readConfiguredKey(value);
  return deriveDevelopmentKey();
};

export const getEncryptionKey = () => {
  if (globalForCrypto.earshotEncryptionKey)
    return globalForCrypto.earshotEncryptionKey;
  const key = loadKey();
  globalForCrypto.earshotEncryptionKey = key;
  return key;
};
