import type { ByteRange } from '@/server/files/types';

export type StorageAdapter = {
  write: (key: string, data: Uint8Array) => Promise<void>;
  size: (key: string) => Promise<number>;
  readStream: (key: string, range?: ByteRange) => ReadableStream<Uint8Array>;
  remove: (key: string) => Promise<void>;
};
