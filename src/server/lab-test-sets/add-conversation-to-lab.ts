import 'server-only';

import { withValidation } from '@/server/common/run-action';
import { createLabTestSet } from '@/server/lab-test-sets/create-lab-test-set';
import { createLabTestSetSchema } from '@/server/lab-test-sets/schemas';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

export const addConversationToLab = withValidation(
  createLabTestSetSchema,
  async (input) => {
    await requireProjectAccess(input.projectId);
    return createLabTestSet(input);
  },
);
