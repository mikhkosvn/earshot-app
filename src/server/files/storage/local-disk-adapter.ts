import 'server-only';

import { createReadStream } from 'node:fs';
import { mkdir, rm, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { Readable } from 'node:stream';

import { ExternalService } from '@/server/common/logging/constants';
import { recordExternalCall } from '@/server/common/logging/event-fields';
import { callStorage, storageError } from '@/server/files/storage/call-storage';
import type { StorageAdapter } from '@/server/files/storage/storage-adapter';
import { StorageOperation } from '@/server/files/storage/storage-operation';
import type { ByteRange } from '@/server/files/types';

const storageRoot = () =>
  path.resolve(
    /* turbopackIgnore: true */ process.env.STORAGE_DIR ||
      path.join(/* turbopackIgnore: true */ process.cwd(), 'storage'),
  );

const resolveKey = (key: string) => {
  const root = storageRoot();
  const filePath = path.resolve(/* turbopackIgnore: true */ root, key);
  if (!filePath.startsWith(root + path.sep)) {
    throw new Error('The storage key is not valid.');
  }
  return filePath;
};

const openReadStream = (key: string, range?: ByteRange) => {
  try {
    return Readable.toWeb(
      createReadStream(
        resolveKey(key),
        range && { start: range.start, end: range.end },
      ),
    ) as ReadableStream<Uint8Array>;
  } catch (error) {
    throw storageError(StorageOperation.read_stream, error);
  }
};

export const localDiskAdapter: StorageAdapter = {
  write: (key, data) =>
    callStorage(StorageOperation.write, async () => {
      const filePath = resolveKey(key);
      await mkdir(path.dirname(filePath), { recursive: true });
      await writeFile(filePath, data);
    }),
  size: (key) =>
    callStorage(
      StorageOperation.size,
      async () => (await stat(resolveKey(key))).size,
    ),
  readStream: (key, range) => {
    recordExternalCall({
      service: ExternalService.file_storage,
      operation: StorageOperation.read_stream,
      attempt: 1,
    });
    return openReadStream(key, range);
  },
  remove: (key) =>
    callStorage(StorageOperation.remove, async () => {
      await rm(resolveKey(key), { force: true });
    }),
  removeFolder: (prefix) =>
    callStorage(StorageOperation.remove_folder, async () => {
      await rm(resolveKey(prefix), { recursive: true, force: true });
    }),
};
