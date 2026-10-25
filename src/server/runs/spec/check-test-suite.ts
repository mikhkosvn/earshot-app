import 'server-only';

import { withValidation } from '@/server/common/run-action';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';
import { testSuiteRequestSchema } from '@/server/runs/schemas';
import { prepareSpec, toSpecCheck } from '@/server/runs/spec/prepare-spec';
import type { SpecCheck } from '@/server/runs/types';

export const checkTestSuite = withValidation(
  testSuiteRequestSchema,
  async (input): Promise<SpecCheck> => {
    await requireProjectAccess(input.projectId);
    return toSpecCheck(await prepareSpec(input));
  },
);
