import 'server-only';

import { addEventFields } from '@/server/common/logging/event-fields';

export const getKmsKeyName = () => {
  const value = process.env.KMS_KEY_NAME;
  if (value) return value;
  if (process.env.NODE_ENV === 'production') {
    throw new Error('KMS_KEY_NAME is not set.');
  }
  addEventFields({ encryption: { kms_disabled: true } });
  return null;
};
