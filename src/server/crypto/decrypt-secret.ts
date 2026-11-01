import 'server-only';

import { CIPHER_SEPARATOR, CipherVersion } from '@/server/crypto/constants';
import { getEncryptionKey } from '@/server/crypto/utils/get-encryption-key';
import { getKmsKeyName } from '@/server/crypto/utils/kms/get-kms-key-name';
import { unwrapDataKey } from '@/server/crypto/utils/kms/unwrap-data-key';
import { openPayload } from '@/server/crypto/utils/open-payload';

const decryptWithEnvelope = async (wrappedKey: string, body: string) => {
  const keyName = getKmsKeyName();
  if (!keyName) {
    throw new Error(
      'KMS_KEY_NAME is not set. It is necessary to read a v2 secret.',
    );
  }
  const dataKey = await unwrapDataKey(
    keyName,
    Buffer.from(wrappedKey, 'base64'),
  );
  try {
    return openPayload(dataKey, body);
  } finally {
    dataKey.fill(0);
  }
};

export const decryptSecret = async (cipherText: string) => {
  const [version, first, second, extra] = cipherText.split(CIPHER_SEPARATOR);
  if (version === CipherVersion.v1 && first && second === undefined) {
    return openPayload(getEncryptionKey(), first);
  }
  if (version === CipherVersion.v2 && first && second && extra === undefined) {
    return decryptWithEnvelope(first, second);
  }
  throw new Error('The secret has an unknown format.');
};
