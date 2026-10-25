import 'server-only';

import { randomInt } from 'node:crypto';

import {
  API_KEY_DISPLAY_PREFIX_LENGTH,
  API_KEY_PREFIX,
  API_KEY_RANDOM_LENGTH,
} from '@/server/api-keys/constants';
import type { GeneratedApiKey } from '@/server/api-keys/types';
import { hashApiKey } from '@/server/api-keys/utils/hash-api-key';

const ALPHABET =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export const generateApiKey = (): GeneratedApiKey => {
  const random = Array.from(
    { length: API_KEY_RANDOM_LENGTH },
    () => ALPHABET[randomInt(ALPHABET.length)],
  ).join('');
  const plainKey = `${API_KEY_PREFIX}${random}`;
  return {
    plainKey,
    keyPrefix: plainKey.slice(0, API_KEY_DISPLAY_PREFIX_LENGTH),
    keyHash: hashApiKey(plainKey),
  };
};
