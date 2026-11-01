'use client';

import { type Mutation, useMutationState } from '@tanstack/react-query';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { EvaluatorService } from '@/app/(app)/test-case/_service';
import type { PendingFolderCreate } from '@/app/(app)/test-case/_utils/folders/folder-list-entries';
import { MutationStatus } from '@/lib/query-client/mutation-status';
import type { CreateFolderInput } from '@/server/folders/types';

type CreateFolderMutation = Mutation<unknown, Error, CreateFolderInput>;

export const usePendingFolderCreates = () => {
  const projectId = useCurrentProjectId();
  const creates = useMutationState<
    PendingFolderCreate | null,
    CreateFolderMutation
  >({
    filters: {
      mutationKey: EvaluatorService.createFolderMutationKey,
      status: MutationStatus.pending,
    },
    select: (mutation) => {
      const input = mutation.state.variables;
      if (!input) return null;
      return { mutationId: mutation.mutationId, input };
    },
  });
  return creates.filter(
    (create): create is PendingFolderCreate =>
      create?.input.projectId === projectId,
  );
};
