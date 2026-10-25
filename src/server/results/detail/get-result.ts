import 'server-only';

import { prisma } from '@/lib/prisma';
import { requireUser } from '@/server/auth';
import { withValidation } from '@/server/common/run-action';
import { projectAccessWhere } from '@/server/projects/utils/project-access-where';
import { resultIdSchema } from '@/server/results/schemas';
import type { ResultDetail } from '@/server/results/types';
import { loadResultDetail } from '@/server/results/utils/detail/load-result-detail';

export const getResult = withValidation(
  resultIdSchema,
  async ({ resultId }): Promise<ResultDetail> => {
    const { user } = await requireUser();
    await prisma.result.findUniqueOrThrow({
      where: { id: resultId, project: projectAccessWhere(user.id) },
      select: { id: true },
    });
    return loadResultDetail(resultId);
  },
);
