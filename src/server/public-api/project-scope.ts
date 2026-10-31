import 'server-only';

import { z } from 'zod';

import { prisma } from '@/lib/prisma';
import type { ApiKeyAuth } from '@/server/api-keys/types';
import { ActionError } from '@/server/common/run-action';
import {
  NOT_FOUND_DETAIL,
  PROJECT_ID_REQUIRED_DETAIL,
  STATUS_CODE_NOT_FOUND,
} from '@/server/public-api/constants';

const projectIdQuerySchema = z.coerce.number().int().positive().optional();

const notFound = () => new ActionError(NOT_FOUND_DETAIL, STATUS_CODE_NOT_FOUND);

export const assertProjectInScope = async (
  auth: ApiKeyAuth,
  projectId: number,
) => {
  if (auth.projectId !== null && auth.projectId !== projectId) throw notFound();
  const project = await prisma.project.findFirst({
    where: { id: projectId, organizationId: auth.organizationId },
    select: { id: true },
  });
  if (!project) throw notFound();
  return project.id;
};

export const resolveProjectId = async (
  auth: ApiKeyAuth,
  projectId: number | null | undefined,
) => {
  if (projectId) return assertProjectInScope(auth, projectId);
  if (auth.projectId !== null) return auth.projectId;
  throw new ActionError(PROJECT_ID_REQUIRED_DETAIL);
};

export const readProjectIdQuery = (request: Request) => {
  const value = new URL(request.url).searchParams.get('project_id');
  const parsed = projectIdQuerySchema.safeParse(value ?? undefined);
  if (!parsed.success) throw new ActionError(PROJECT_ID_REQUIRED_DETAIL);
  return parsed.data ?? null;
};

export const resolveQueryProjectId = (auth: ApiKeyAuth, request: Request) =>
  resolveProjectId(auth, readProjectIdQuery(request));
