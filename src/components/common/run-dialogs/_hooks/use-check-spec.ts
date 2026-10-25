'use client';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';

import { useCheckTestSuiteMutation } from './mutations/use-check-test-suite-mutation';
import type { RunFromFileForm } from './use-run-from-file-form';

export const useCheckSpec = (form: RunFromFileForm) => {
  const projectId = useCurrentProjectId();
  const checkTestSuite = useCheckTestSuiteMutation();

  const checkSpec = form.handleSubmit((values) =>
    checkTestSuite.mutate({ ...values, projectId }),
  );

  return { checkSpec, isChecking: checkTestSuite.isPending };
};
