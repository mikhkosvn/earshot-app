import 'server-only';

import { prisma } from '@/lib/prisma';
import { projectAccessWhere } from '@/server/projects/utils/project-access-where';

export const findFileForUser = (fileId: string, userId: number) =>
  prisma.storedFile.findFirst({
    where: { id: fileId, project: projectAccessWhere(userId) },
  });
