import 'server-only';

import { KmsOperation } from '@/server/crypto/constants';
import { callKms } from '@/server/crypto/utils/kms/call-kms';
import { crc32c } from '@/server/crypto/utils/kms/crc32c';
import { getKmsClient } from '@/server/crypto/utils/kms/get-kms-client';
import { kmsBytes } from '@/server/crypto/utils/kms/kms-bytes';

export const wrapDataKey = async (keyName: string, dataKey: Buffer) => {
  const [response] = await callKms(KmsOperation.encrypt, () =>
    getKmsClient().encrypt({
      name: keyName,
      plaintext: dataKey,
      plaintextCrc32c: { value: crc32c(dataKey) },
    }),
  );
  if (!response.verifiedPlaintextCrc32c) {
    throw new Error('Cloud KMS did not verify the data key checksum.');
  }
  const wrappedKey = kmsBytes(response.ciphertext);
  if (crc32c(wrappedKey) !== Number(response.ciphertextCrc32c?.value)) {
    throw new Error('The wrapped data key from Cloud KMS is corrupted.');
  }
  return wrappedKey;
};
