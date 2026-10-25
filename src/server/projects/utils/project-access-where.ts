import 'server-only';

import type { Prisma } from '@/generated/prisma/client';

export const projectAccessWhere = (
  userId: number,
): Prisma.ProjectWhereInput => ({
  organization: { members: { some: { userId } } },
});
