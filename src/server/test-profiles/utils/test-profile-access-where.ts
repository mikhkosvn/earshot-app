import 'server-only';

import type { Prisma } from '@/generated/prisma/client';
import { projectAccessWhere } from '@/server/projects/utils/project-access-where';

export const testProfileAccessWhere = (userId: number) =>
  ({
    project: projectAccessWhere(userId),
  }) satisfies Prisma.TestProfileWhereInput;
