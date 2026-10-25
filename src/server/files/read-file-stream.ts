import 'server-only';

import type { StoredFile } from '@/generated/prisma/client';
import { getStorageAdapter } from '@/server/files/storage/get-storage-adapter';
import type { ByteRange, FileStream } from '@/server/files/types';

export const readFileStream = async (
  file: Pick<StoredFile, 'storageKey'>,
  range?: ByteRange,
): Promise<FileStream> => {
  const storage = getStorageAdapter();
  const size = await storage.size(file.storageKey);
  const start = range?.start ?? 0;
  const end = Math.min(range?.end ?? size - 1, size - 1);
  return {
    stream: storage.readStream(file.storageKey, { start, end }),
    start,
    end,
    size,
  };
};
