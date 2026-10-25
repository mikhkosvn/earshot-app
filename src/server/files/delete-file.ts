import 'server-only';

import { prisma } from '@/lib/prisma';
import { getStorageAdapter } from '@/server/files/storage/get-storage-adapter';

export const deleteFile = async (fileId: string) => {
  const file = await prisma.storedFile.delete({
    where: { id: fileId },
    select: { storageKey: true },
  });
  await getStorageAdapter().remove(file.storageKey);
};
