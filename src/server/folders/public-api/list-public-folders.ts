import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import type { ApiKeyAuth } from '@/server/api-keys/types';
import { addEventFields } from '@/server/common/logging/event-fields';
import {
  publicFolderSelect,
  toPublicFolder,
} from '@/server/folders/public-api/utils/public-folder';
import { resolveQueryProjectId } from '@/server/public-api/project-scope';

export const listPublicFolders = async ({
  auth,
  request,
}: {
  auth: ApiKeyAuth;
  request: Request;
}) => {
  const projectId = await resolveQueryProjectId(auth, request);
  const rows = await prisma.folder.findMany({
    where: { projectId },
    orderBy: { path: Prisma.SortOrder.asc },
    select: publicFolderSelect,
  });
  addEventFields({
    organization: { id: auth.organizationId },
    project: { id: projectId },
    folders: { count: rows.length },
  });
  return rows.map(toPublicFolder);
};
