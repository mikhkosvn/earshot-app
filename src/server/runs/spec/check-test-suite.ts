import 'server-only';

import { withValidation } from '@/server/common/run-action';
import { addEventFields } from '@/server/common/logging/event-fields';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';
import { testSuiteRequestSchema } from '@/server/runs/schemas';
import { prepareSpec, toSpecCheck } from '@/server/runs/spec/prepare-spec';
import type { SpecCheck } from '@/server/runs/types';

export const checkTestSuite = withValidation(
  testSuiteRequestSchema,
  async (input): Promise<SpecCheck> => {
    await requireProjectAccess(input.projectId);
    const check = toSpecCheck(await prepareSpec(input));
    addEventFields({
      agent: { id: input.agentId },
      spec: {
        valid: check.valid,
        error_count: check.errors.length,
        total_runs: check.plan?.totalRuns ?? null,
      },
    });
    return check;
  },
);
