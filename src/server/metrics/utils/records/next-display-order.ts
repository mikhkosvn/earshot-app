import 'server-only';

import type { Prisma } from '@/generated/prisma/client';

export const nextDisplayOrder = async (
  tx: Prisma.TransactionClient,
  projectId: number,
) => {
  const { _max } = await tx.metric.aggregate({
    where: { projectId },
    _max: { displayOrder: true },
  });
  return (_max.displayOrder ?? 0) + 1;
};
