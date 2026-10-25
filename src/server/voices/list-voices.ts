import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import type { VoiceModel } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';
import {
  ELEVENLABS_VOICE_MODELS,
  ELEVENLABS_VOICES,
} from '@/server/voices/constants/elevenlabs-voices';
import { listVoicesSchema } from '@/server/voices/schemas';
import type { VoiceCatalog, VoiceOption } from '@/server/voices/types';
import { clonedVoiceProjectWhere } from '@/server/voices/utils/cloned-voice-where';

const catalogFor = (voiceModel: VoiceModel): VoiceOption[] => {
  if (!ELEVENLABS_VOICE_MODELS.includes(voiceModel)) return [];
  return ELEVENLABS_VOICES.map((voice) => ({
    id: voice.id,
    label: `${voice.name} - ${voice.traits}`,
    gender: voice.gender,
    accent: voice.accent,
    sampleFileId: null,
  }));
};

export const listVoices = withValidation(
  listVoicesSchema,
  async ({ projectId, voiceModel }): Promise<VoiceCatalog> => {
    await requireProjectAccess(projectId);
    const cloned = await prisma.clonedVoice.findMany({
      where: clonedVoiceProjectWhere(projectId),
      orderBy: { createdAt: Prisma.SortOrder.desc },
      select: { id: true, name: true, sampleFileId: true },
    });
    const catalog = catalogFor(voiceModel);
    addEventFields({
      project: { id: projectId },
      voices: {
        voice_model: voiceModel,
        catalog_count: catalog.length,
        cloned_count: cloned.length,
      },
    });
    return {
      catalog,
      cloned: cloned.map((voice) => ({
        id: voice.id,
        label: voice.name,
        gender: null,
        accent: null,
        sampleFileId: voice.sampleFileId,
      })),
    };
  },
);
