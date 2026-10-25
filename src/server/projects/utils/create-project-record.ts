import 'server-only';

import type { Prisma } from '@/generated/prisma/client';

import { seedProjectDefaults } from './seed-project-defaults';

interface CreateProjectRecordArgs {
  organizationId: number;
  name: string;
}

export const createProjectRecord = async (
  tx: Prisma.TransactionClient,
  { organizationId, name }: CreateProjectRecordArgs,
) => {
  const project = await tx.project.create({
    data: { organizationId, name },
    select: { id: true, name: true, organizationId: true },
  });
  await seedProjectDefaults(tx, project.id);
  return project;
};
