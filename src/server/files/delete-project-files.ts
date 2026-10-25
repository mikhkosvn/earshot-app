import 'server-only';

import { getStorageAdapter } from '@/server/files/storage/get-storage-adapter';

export const deleteProjectFiles = async (projectId: number) => {
  await getStorageAdapter().removeFolder(`${projectId}`);
};
