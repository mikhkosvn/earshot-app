export const CIPHER_ALGORITHM = 'aes-256-gcm';
export const CIPHER_SEPARATOR = ':';
export const IV_LENGTH_BYTES = 12;
export const AUTH_TAG_LENGTH_BYTES = 16;
export const DATA_KEY_LENGTH_BYTES = 32;

export const CipherVersion = {
  v1: 'v1',
  v2: 'v2',
} as const;
export type CipherVersion = (typeof CipherVersion)[keyof typeof CipherVersion];

export const KmsOperation = {
  encrypt: 'encrypt',
  decrypt: 'decrypt',
} as const;
export type KmsOperation = (typeof KmsOperation)[keyof typeof KmsOperation];
