'use client';

import { type Mutation, useMutationState } from '@tanstack/react-query';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { EvaluatorService } from '@/app/(app)/test-case/_service';
import { MutationStatus } from '@/lib/query-client/mutation-status';
import type { RenameFolderInput } from '@/server/folders/types';

type RenameFolderMutation = Mutation<unknown, Error, RenameFolderInput>;

export const usePendingFolderName = (path: string) => {
  const projectId = useCurrentProjectId();
  const renames = useMutationState<
    RenameFolderInput | undefined,
    RenameFolderMutation
  >({
    filters: {
      mutationKey: EvaluatorService.renameFolderMutationKey,
      status: MutationStatus.pending,
    },
    select: (mutation) => mutation.state.variables,
  });
  const rename = renames.findLast(
    (input) => input?.projectId === projectId && input.path === path,
  );
  return rename?.name.trim() ?? null;
};
