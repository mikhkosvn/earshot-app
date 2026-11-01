import 'server-only';

import { randomBytes } from 'node:crypto';

import {
  CIPHER_SEPARATOR,
  CipherVersion,
  DATA_KEY_LENGTH_BYTES,
} from '@/server/crypto/constants';
import { getEncryptionKey } from '@/server/crypto/utils/get-encryption-key';
import { getKmsKeyName } from '@/server/crypto/utils/kms/get-kms-key-name';
import { wrapDataKey } from '@/server/crypto/utils/kms/wrap-data-key';
import { sealPayload } from '@/server/crypto/utils/seal-payload';

const encryptLocally = (plain: string) =>
  [CipherVersion.v1, sealPayload(getEncryptionKey(), plain)].join(
    CIPHER_SEPARATOR,
  );

const encryptWithEnvelope = async (keyName: string, plain: string) => {
  const dataKey = randomBytes(DATA_KEY_LENGTH_BYTES);
  try {
    const wrappedKey = await wrapDataKey(keyName, dataKey);
    return [
      CipherVersion.v2,
      wrappedKey.toString('base64'),
      sealPayload(dataKey, plain),
    ].join(CIPHER_SEPARATOR);
  } finally {
    dataKey.fill(0);
  }
};

export const encryptSecret = async (plain: string) => {
  const keyName = getKmsKeyName();
  if (!keyName) return encryptLocally(plain);
  return encryptWithEnvelope(keyName, plain);
};
