import 'server-only';

import { requireUser } from '@/server/auth';
import { withValidation } from '@/server/common/run-action';
import { generationSessionIdSchema } from '@/server/evaluator-generation/schemas';
import { sessionAccessWhere } from '@/server/evaluator-generation/utils/session-records';
import { loadSessionView } from '@/server/evaluator-generation/utils/session-view';

export const getGenerationSession = withValidation(
  generationSessionIdSchema,
  async ({ sessionId }) => {
    const { user } = await requireUser();
    return loadSessionView({ id: sessionId, ...sessionAccessWhere(user.id) });
  },
);
