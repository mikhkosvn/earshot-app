import 'server-only';

import type { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { withValidation } from '@/server/common/run-action';
import { copyEvaluators } from '@/server/evaluators/utils/copy-evaluator';
import { FOLDER_COPY_SUFFIX } from '@/server/folders/constants';
import { folderTargetSchema } from '@/server/folders/schemas';
import { findFolderOrThrow } from '@/server/folders/utils/find-folder';
import {
  folderName,
  joinFolderPath,
  parentFolderPath,
} from '@/server/folders/utils/folder-path';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

const MAX_COPY_ATTEMPTS = 50;

const copySuffix = (attempt: number) => {
  if (attempt === 1) return FOLDER_COPY_SUFFIX;
  return `${FOLDER_COPY_SUFFIX.slice(0, -1)} ${attempt})`;
};

const freeCopyPath = async (
  tx: Prisma.TransactionClient,
  projectId: number,
  path: string,
) => {
  const parent = parentFolderPath(path);
  for (let attempt = 1; attempt <= MAX_COPY_ATTEMPTS; attempt += 1) {
    const candidate = joinFolderPath(
      parent,
      `${folderName(path)}${copySuffix(attempt)}`,
    );
    const existing = await tx.folder.findUnique({
      where: { projectId_path: { projectId, path: candidate } },
      select: { id: true },
    });
    if (!existing) return candidate;
  }
  return joinFolderPath(parent, `${folderName(path)} ${Date.now()}`);
};

export const duplicateFolder = withValidation(
  folderTargetSchema,
  async ({ projectId, path }) => {
    const { user } = await requireProjectAccess(projectId);
    return prisma.$transaction(async (tx) => {
      const source = await findFolderOrThrow(tx, projectId, path);
      const copyPath = await freeCopyPath(tx, projectId, path);
      const folder = await tx.folder.create({
        data: { projectId, path: copyPath },
        select: { id: true, path: true },
      });
      const createdIds = await copyEvaluators(
        tx,
        { projectId, folderId: source.id },
        {
          projectId,
          folderId: folder.id,
          userId: user.id,
          namePrefix: '',
        },
      );
      return { path: folder.path, evaluatorCount: createdIds.length };
    });
  },
);
