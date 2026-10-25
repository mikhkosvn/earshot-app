import { createLoader } from 'nuqs/server';

import { evaluatorListParams } from '@/app/(app)/test-case/_constants/evaluator-list-params';

export const loadEvaluatorListParams = createLoader(evaluatorListParams);
