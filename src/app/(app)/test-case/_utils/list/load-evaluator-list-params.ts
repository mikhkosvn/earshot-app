import { createLoader } from 'nuqs/server';

import {
  evaluatorListParams,
  legacyFolderParams,
} from '@/app/(app)/test-case/_constants/evaluator-list-params';

export const loadLegacyFolderParams = createLoader(legacyFolderParams);

export const loadEvaluatorListParams = createLoader(evaluatorListParams);
