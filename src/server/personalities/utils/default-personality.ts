import 'server-only';

import type { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { DEFAULT_PERSONALITY } from '@/server/personalities/constants/default-personality';
import { LIVE_VOICE_TRAITS } from '@/server/personalities/constants/live-voices';

export const createDefaultPersonality = async (
  tx: Prisma.TransactionClient,
  projectId: number,
) => {
  const traits = LIVE_VOICE_TRAITS[DEFAULT_PERSONALITY.voice];
  const personality = await tx.personality.create({
    data: {
      projectId,
      name: DEFAULT_PERSONALITY.name,
      prompt: DEFAULT_PERSONALITY.prompt,
      language: DEFAULT_PERSONALITY.language,
      voice: DEFAULT_PERSONALITY.voice,
      accent: traits.accent,
      gender: traits.gender,
      enabledByDefault: false,
      projectEnablements: { create: { projectId } },
    },
    select: { id: true },
  });
  await tx.project.update({
    where: { id: projectId },
    data: { defaultPersonalityId: personality.id },
  });
  return personality.id;
};

export const ensureDefaultPersonalityId = async (
  tx: Prisma.TransactionClient,
  projectId: number,
) => {
  const project = await tx.project.findUniqueOrThrow({
    where: { id: projectId },
    select: { defaultPersonalityId: true },
  });
  if (project.defaultPersonalityId === null) {
    return createDefaultPersonality(tx, projectId);
  }
  await tx.projectPersonality.createMany({
    data: [{ projectId, personalityId: project.defaultPersonalityId }],
    skipDuplicates: true,
  });
  return project.defaultPersonalityId;
};

export const defaultPersonalityIdOf = (projectId: number) =>
  prisma.$transaction((tx) => ensureDefaultPersonalityId(tx, projectId));
