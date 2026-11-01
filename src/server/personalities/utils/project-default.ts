import 'server-only';

import { prisma } from '@/lib/prisma';

export const projectDefaultPersonalityId = async (projectId: number) => {
  const project = await prisma.project.findUniqueOrThrow({
    where: { id: projectId },
    select: { defaultPersonalityId: true },
  });
  return project.defaultPersonalityId;
};
