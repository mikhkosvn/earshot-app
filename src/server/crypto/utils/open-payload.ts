import 'server-only';

import { createDecipheriv } from 'node:crypto';

import {
  AUTH_TAG_LENGTH_BYTES,
  CIPHER_ALGORITHM,
  IV_LENGTH_BYTES,
} from '@/server/crypto/constants';

export const openPayload = (key: Buffer, body: string) => {
  const payload = Buffer.from(body, 'base64');
  const iv = payload.subarray(0, IV_LENGTH_BYTES);
  const authTag = payload.subarray(
    IV_LENGTH_BYTES,
    IV_LENGTH_BYTES + AUTH_TAG_LENGTH_BYTES,
  );
  const encrypted = payload.subarray(IV_LENGTH_BYTES + AUTH_TAG_LENGTH_BYTES);
  const decipher = createDecipheriv(CIPHER_ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);
  return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString(
    'utf8',
  );
};
