import 'server-only';

import { prisma } from '@/lib/prisma';
import { ActionError, withValidation } from '@/server/common/run-action';
import { deleteFile } from '@/server/files/delete-file';
import { saveFile } from '@/server/files/save-file';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';
import { cloneVoiceSchema } from '@/server/voices/schemas';
import type { ClonedVoiceResult } from '@/server/voices/types';

const DEFAULT_AUDIO_TYPE = 'audio/mpeg';

export const cloneVoice = withValidation(
  cloneVoiceSchema,
  async ({ projectId, name, sample }): Promise<ClonedVoiceResult> => {
    await requireProjectAccess(projectId);
    if (!sample) throw new ActionError('Choose an audio file.', 400);
    const stored = await saveFile({
      projectId,
      fileName: sample.name,
      contentType: sample.type || DEFAULT_AUDIO_TYPE,
      data: new Uint8Array(await sample.arrayBuffer()),
    });
    try {
      return await prisma.clonedVoice.create({
        data: { name, sampleFileId: stored.id },
        select: { id: true, name: true },
      });
    } catch (error) {
      await deleteFile(stored.id);
      throw error;
    }
  },
);
