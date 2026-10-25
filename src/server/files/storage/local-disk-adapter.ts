import 'server-only';

import { createReadStream } from 'node:fs';
import { mkdir, rm, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { Readable } from 'node:stream';

import type { StorageAdapter } from '@/server/files/storage/storage-adapter';

const storageRoot = () =>
  path.resolve(process.env.STORAGE_DIR || path.join(process.cwd(), 'storage'));

const resolveKey = (key: string) => {
  const root = storageRoot();
  const filePath = path.resolve(root, key);
  if (!filePath.startsWith(root + path.sep)) {
    throw new Error('The storage key is not valid.');
  }
  return filePath;
};

export const localDiskAdapter: StorageAdapter = {
  write: async (key, data) => {
    const filePath = resolveKey(key);
    await mkdir(path.dirname(filePath), { recursive: true });
    await writeFile(filePath, data);
  },
  size: async (key) => (await stat(resolveKey(key))).size,
  readStream: (key, range) =>
    Readable.toWeb(
      createReadStream(
        resolveKey(key),
        range && { start: range.start, end: range.end },
      ),
    ) as ReadableStream<Uint8Array>,
  remove: async (key) => {
    await rm(resolveKey(key), { force: true });
  },
};
