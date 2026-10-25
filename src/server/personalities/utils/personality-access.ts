import 'server-only';

import type { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { requireUser } from '@/server/auth';
import { ActionError } from '@/server/common/run-action';
import { ALL_LANGUAGES } from '@/server/personalities/constants/personality-filters';
import type { PersonalityLanguageFilter } from '@/server/personalities/types';
import { projectAccessWhere } from '@/server/projects/utils/project-access-where';

export const visiblePersonalityWhere = (
  projectId: number,
): Prisma.PersonalityWhereInput => ({
  OR: [{ projectId: null }, { projectId }],
});

export const personalityLanguageWhere = (
  language: PersonalityLanguageFilter,
): Prisma.PersonalityWhereInput => {
  if (language === ALL_LANGUAGES) return {};
  return { language };
};

export const readablePersonalityWhere = (
  userId: number,
): Prisma.PersonalityWhereInput => ({
  OR: [{ projectId: null }, { project: projectAccessWhere(userId) }],
});

export const requireCustomPersonality = async (personalityId: number) => {
  const { user } = await requireUser();
  const personality = await prisma.personality.findUniqueOrThrow({
    where: { id: personalityId, AND: [readablePersonalityWhere(user.id)] },
    select: { id: true, projectId: true },
  });
  if (personality.projectId === null) {
    throw new ActionError(
      'Predefined personalities cannot be changed. Fork it to edit a copy.',
      403,
    );
  }
  return {
    user,
    personality: { ...personality, projectId: personality.projectId },
  };
};
