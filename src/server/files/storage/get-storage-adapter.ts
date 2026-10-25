import 'server-only';

import { localDiskAdapter } from '@/server/files/storage/local-disk-adapter';
import type { StorageAdapter } from '@/server/files/storage/storage-adapter';

export const getStorageAdapter = (): StorageAdapter => localDiskAdapter;
