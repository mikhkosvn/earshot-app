import 'server-only';

import type { Prisma } from '@/generated/prisma/client';

export const uniqueTagNames = (names: string[]) => [
  ...new Set(names.map((name) => name.trim()).filter(Boolean)),
];

export const upsertTags = async (
  tx: Prisma.TransactionClient,
  projectId: number,
  names: string[],
) => {
  const tagIds: number[] = [];
  for (const name of uniqueTagNames(names)) {
    const tag = await tx.tag.upsert({
      where: { projectId_name: { projectId, name } },
      create: { projectId, name },
      update: {},
      select: { id: true },
    });
    tagIds.push(tag.id);
  }
  return tagIds;
};
