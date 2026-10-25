import 'server-only';

import type { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import { withValidation } from '@/server/common/run-action';
import { forkPersonalitySchema } from '@/server/personalities/schemas';
import type { PersonalityRef } from '@/server/personalities/types';
import { visiblePersonalityWhere } from '@/server/personalities/utils/personality-access';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

const forkedSettingsSelect = {
  name: true,
  description: true,
  prompt: true,
  language: true,
  accent: true,
  gender: true,
  voiceModel: true,
  voiceId: true,
  voiceVolume: true,
  speed: true,
  interruptionLevel: true,
  backgroundNoise: true,
  backgroundNoiseUrl: true,
  backgroundSoundVolumeBase: true,
  backgroundSoundVolumeReduced: true,
  packetLossPercent: true,
  jitterPercent: true,
  latencyPercent: true,
  idleTimeoutSeconds: true,
  idleMessageMaxSpokenCount: true,
  startSpeakingWaitSeconds: true,
  stopSpeakingNumWords: true,
  stopSpeakingVoiceSeconds: true,
  stopSpeakingBackoffSeconds: true,
  cartesiaVolume: true,
  cartesiaEmotion: true,
} satisfies Prisma.PersonalitySelect;

export const forkPersonality = withValidation(
  forkPersonalitySchema,
  async ({ projectId, personalityId }): Promise<PersonalityRef> => {
    await requireProjectAccess(projectId);
    const settings = await prisma.personality.findUniqueOrThrow({
      where: { id: personalityId, AND: [visiblePersonalityWhere(projectId)] },
      select: forkedSettingsSelect,
    });
    return prisma.personality.create({
      data: {
        ...settings,
        projectId,
        forkedFromId: personalityId,
        enabledByDefault: false,
        projectEnablements: { create: { projectId } },
      },
      select: { id: true },
    });
  },
);
