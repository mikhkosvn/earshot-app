import 'server-only';

import { prisma } from '@/lib/prisma';

export const readLatestProjectKnowledge = (projectId: number) =>
  prisma.projectKnowledgeVersion.findFirst({
    where: { projectId },
    orderBy: { version: 'desc' },
    select: { version: true, content: true, createdAt: true },
  });
