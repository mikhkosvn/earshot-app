import 'server-only';

import { prisma } from '@/lib/prisma';
import type { ApiKeyAuth } from '@/server/api-keys/types';
import { addEventFields } from '@/server/common/logging/event-fields';
import { throwFieldErrors } from '@/server/evaluators/public-api/utils/field-errors';
import { createPublicFolderSchema } from '@/server/folders/public-api/schemas';
import {
  publicFolderSelect,
  toPublicFolder,
} from '@/server/folders/public-api/utils/public-folder';
import { joinFolderPath } from '@/server/folders/utils/folder-path';
import { resolveProjectId } from '@/server/public-api/project-scope';
import { readJsonBody } from '@/server/public-api/read-json-body';

const DUPLICATE_FOLDER_MESSAGE = 'A folder with this name already exists.';

export const createPublicFolder = async ({
  auth,
  request,
}: {
  auth: ApiKeyAuth;
  request: Request;
}) => {
  const body = createPublicFolderSchema.parse(await readJsonBody(request));
  const projectId = await resolveProjectId(auth, body.project_id);
  const path = joinFolderPath(null, body.name);
  const row = await prisma.$transaction(async (tx) => {
    const existing = await tx.folder.findUnique({
      where: { projectId_path: { projectId, path } },
      select: { id: true },
    });
    if (existing) {
      throwFieldErrors([{ field: 'name', message: DUPLICATE_FOLDER_MESSAGE }]);
    }
    return tx.folder.create({
      data: { projectId, path },
      select: publicFolderSelect,
    });
  });
  addEventFields({
    organization: { id: auth.organizationId },
    project: { id: projectId },
    folder: { id: row.id },
  });
  return toPublicFolder(row);
};
