import 'server-only';

import type { Prisma } from '@/generated/prisma/client';

export const clonedVoiceProjectWhere = (
  projectId: number,
): Prisma.ClonedVoiceWhereInput => ({
  sampleFile: { projectId },
});
