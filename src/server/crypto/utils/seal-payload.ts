import 'server-only';

import { createCipheriv, randomBytes } from 'node:crypto';

import { CIPHER_ALGORITHM, IV_LENGTH_BYTES } from '@/server/crypto/constants';

export const sealPayload = (key: Buffer, plain: string) => {
  const iv = randomBytes(IV_LENGTH_BYTES);
  const cipher = createCipheriv(CIPHER_ALGORITHM, key, iv);
  const encrypted = Buffer.concat([
    cipher.update(plain, 'utf8'),
    cipher.final(),
  ]);
  return Buffer.concat([iv, cipher.getAuthTag(), encrypted]).toString('base64');
};
