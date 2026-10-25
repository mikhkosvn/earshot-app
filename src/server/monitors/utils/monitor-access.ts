import 'server-only';

import type { Prisma } from '@/generated/prisma/client';
import { projectAccessWhere } from '@/server/projects/utils/project-access-where';

export const monitorAccessWhere = (
  userId: number,
): Prisma.MonitorWhereInput => ({
  project: projectAccessWhere(userId),
});
