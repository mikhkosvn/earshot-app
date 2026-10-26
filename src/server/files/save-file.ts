import 'server-only';

import { randomUUID } from 'node:crypto';
import path from 'node:path';

import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
import { getStorageAdapter } from '@/server/files/storage/get-storage-adapter';
import type { SaveFileArgs } from '@/server/files/types';

const safeExtension = (fileName: string) => {
  const extension = path.extname(fileName).toLowerCase();
  if (/^\.[a-z0-9]{1,10}$/.test(extension)) return extension;
  return '';
};

export const saveFile = async ({
  projectId,
  fileName,
  contentType,
  data,
}: SaveFileArgs) => {
  const id = randomUUID();
  const storageKey = `${projectId}/${id}${safeExtension(fileName)}`;
  const storage = getStorageAdapter();
  await storage.write(storageKey, data);
  try {
    const stored = await prisma.storedFile.create({
      data: {
        id,
        projectId,
        storageKey,
        fileName,
        contentType,
        sizeBytes: data.byteLength,
      },
    });
    addEventFields({
      file: { id, content_type: contentType, size_bytes: data.byteLength },
    });
    return stored;
  } catch (error) {
    await storage.remove(storageKey);
    throw error;
  }
};
