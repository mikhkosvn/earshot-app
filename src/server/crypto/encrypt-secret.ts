import 'server-only';

import { createCipheriv, randomBytes } from 'node:crypto';

import {
  CIPHER_ALGORITHM,
  CIPHER_VERSION,
  IV_LENGTH_BYTES,
} from '@/server/crypto/constants';
import { getEncryptionKey } from '@/server/crypto/utils/get-encryption-key';

export const encryptSecret = (plain: string) => {
  const iv = randomBytes(IV_LENGTH_BYTES);
  const cipher = createCipheriv(CIPHER_ALGORITHM, getEncryptionKey(), iv);
  const encrypted = Buffer.concat([
    cipher.update(plain, 'utf8'),
    cipher.final(),
  ]);
  const payload = Buffer.concat([iv, cipher.getAuthTag(), encrypted]);
  return `${CIPHER_VERSION}:${payload.toString('base64')}`;
};
