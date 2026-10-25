import 'server-only';

import type { StoredFile } from '@/generated/prisma/client';
import { readFileStream } from '@/server/files/read-file-stream';

export const readFileBytes = async (file: Pick<StoredFile, 'storageKey'>) => {
  const { stream } = await readFileStream(file);
  return new Uint8Array(await new Response(stream).arrayBuffer());
};
