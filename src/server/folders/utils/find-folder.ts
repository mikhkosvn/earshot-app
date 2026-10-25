import 'server-only';

import type { Prisma } from '@/generated/prisma/client';
import { ActionError } from '@/server/common/run-action';

export const findFolderOrThrow = async (
  tx: Prisma.TransactionClient,
  projectId: number,
  path: string,
) => {
  const folder = await tx.folder.findUnique({
    where: { projectId_path: { projectId, path } },
    select: { id: true, path: true, systemRole: true },
  });
  if (!folder) throw new ActionError('The folder does not exist.', 404);
  return folder;
};

export const assertFolderPathFree = async (
  tx: Prisma.TransactionClient,
  projectId: number,
  path: string,
) => {
  const existing = await tx.folder.findUnique({
    where: { projectId_path: { projectId, path } },
    select: { id: true },
  });
  if (existing) {
    throw new ActionError('A folder with this name already exists.', 409);
  }
};
