import 'server-only';

export const kmsBytes = (value: Uint8Array | string | null | undefined) => {
  if (value instanceof Uint8Array) return Buffer.from(value);
  if (typeof value === 'string') return Buffer.from(value, 'base64');
  throw new Error('Cloud KMS returned no data.');
};
