import 'server-only';

import { randomBytes, scrypt, timingSafeEqual } from 'node:crypto';

const PASSWORD_SCHEME = 'scrypt';
const SALT_LENGTH = 16;
const KEY_LENGTH = 64;
const SCRYPT_OPTIONS = { N: 16384, r: 8, p: 1 };

const deriveKey = (password: string, salt: Buffer) =>
  new Promise<Buffer>((resolve, reject) => {
    scrypt(password, salt, KEY_LENGTH, SCRYPT_OPTIONS, (error, key) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(key);
    });
  });

export const hashPassword = async (password: string) => {
  const salt = randomBytes(SALT_LENGTH);
  const key = await deriveKey(password, salt);
  return `${PASSWORD_SCHEME}$${salt.toString('hex')}$${key.toString('hex')}`;
};

export const verifyPassword = async (password: string, storedHash: string) => {
  const [scheme, saltHex, hashHex] = storedHash.split('$');
  if (scheme !== PASSWORD_SCHEME || !saltHex || !hashHex) return false;
  const expected = Buffer.from(hashHex, 'hex');
  const key = await deriveKey(password, Buffer.from(saltHex, 'hex'));
  if (key.length !== expected.length) return false;
  return timingSafeEqual(key, expected);
};
