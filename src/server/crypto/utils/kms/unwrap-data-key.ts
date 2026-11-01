import 'server-only';

import { KmsOperation } from '@/server/crypto/constants';
import { callKms } from '@/server/crypto/utils/kms/call-kms';
import { crc32c } from '@/server/crypto/utils/kms/crc32c';
import { getKmsClient } from '@/server/crypto/utils/kms/get-kms-client';
import { kmsBytes } from '@/server/crypto/utils/kms/kms-bytes';

export const unwrapDataKey = async (keyName: string, wrappedKey: Buffer) => {
  const [response] = await callKms(KmsOperation.decrypt, () =>
    getKmsClient().decrypt({
      name: keyName,
      ciphertext: wrappedKey,
      ciphertextCrc32c: { value: crc32c(wrappedKey) },
    }),
  );
  const dataKey = kmsBytes(response.plaintext);
  if (crc32c(dataKey) !== Number(response.plaintextCrc32c?.value)) {
    throw new Error('The data key from Cloud KMS is corrupted.');
  }
  return dataKey;
};
