import 'server-only';

import type { Prisma } from '@/generated/prisma/client';
import { projectAccessWhere } from '@/server/projects/utils/project-access-where';

export const evaluatorAccessWhere = (userId: number) =>
  ({
    project: projectAccessWhere(userId),
  }) satisfies Prisma.EvaluatorWhereInput;

export const personalityForProjectWhere = (
  projectId: number,
): Prisma.PersonalityWhereInput => ({
  OR: [{ projectId: null }, { projectId }],
});

export const enabledPersonalityWhere = (
  projectId: number,
): Prisma.PersonalityWhereInput => ({
  OR: [
    { projectId },
    { projectId: null, projectEnablements: { some: { projectId } } },
  ],
});
