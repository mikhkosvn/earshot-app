import 'server-only';

import { createHash } from 'node:crypto';

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
  console.warn(
    '[crypto] ENCRYPTION_KEY is not set. Secrets use a development key. Do not use this key in production.',
  );
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
