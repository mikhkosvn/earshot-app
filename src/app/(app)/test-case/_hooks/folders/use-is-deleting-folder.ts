'use client';

import { type Mutation, useMutationState } from '@tanstack/react-query';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { EvaluatorService } from '@/app/(app)/test-case/_service';
import { isSameOrDescendantFolderPath } from '@/app/(app)/test-case/_utils/folders/folder-path';
import { MutationStatus } from '@/lib/query-client/mutation-status';
import type { FolderTargetInput } from '@/server/folders/types';

type DeleteFolderMutation = Mutation<unknown, Error, FolderTargetInput>;

export const useIsDeletingFolder = (path: string) => {
  const projectId = useCurrentProjectId();
  const deletes = useMutationState<
    FolderTargetInput | undefined,
    DeleteFolderMutation
  >({
    filters: {
      mutationKey: EvaluatorService.deleteFolderMutationKey,
      status: MutationStatus.pending,
    },
    select: (mutation) => mutation.state.variables,
  });
  return deletes.some(
    (input) =>
      input?.projectId === projectId &&
      isSameOrDescendantFolderPath(path, input.path),
  );
};
