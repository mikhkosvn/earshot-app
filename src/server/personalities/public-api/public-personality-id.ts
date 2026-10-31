import 'server-only';

import { prisma } from '@/lib/prisma';

interface PersonalityIdentity {
  id: number;
  catalogId: number | null;
}

export const publicPersonalitySelect = { id: true, catalogId: true } as const;

export const toPublicPersonalityId = (personality: PersonalityIdentity) =>
  personality.catalogId ?? personality.id;

const visibleTo = (projectId: number) => ({
  OR: [{ projectId: null }, { projectId }],
});

export const findPersonalityByPublicId = async (
  projectId: number,
  publicId: number,
) => {
  const byCatalogId = await prisma.personality.findFirst({
    where: { catalogId: publicId, ...visibleTo(projectId) },
    select: publicPersonalitySelect,
  });
  if (byCatalogId) return byCatalogId;
  return prisma.personality.findFirst({
    where: { id: publicId, catalogId: null, ...visibleTo(projectId) },
    select: publicPersonalitySelect,
  });
};

export const resolvePersonalityIds = async (
  projectId: number,
  publicIds: number[],
) => {
  const resolved = new Map<number, number>();
  for (const publicId of publicIds) {
    const personality = await findPersonalityByPublicId(projectId, publicId);
    if (personality) resolved.set(publicId, personality.id);
  }
  return resolved;
};
