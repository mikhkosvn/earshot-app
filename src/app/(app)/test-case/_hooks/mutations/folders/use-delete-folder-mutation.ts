'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { useRouteFolderPath } from '@/app/(app)/test-case/_hooks/folders/use-route-folder-path';
import { EvaluatorService } from '@/app/(app)/test-case/_service';
import { isSameOrDescendantFolderPath } from '@/app/(app)/test-case/_utils/folders/folder-path';
import { UrlGenerator } from '@/lib/url-generator/url-generator';
import { deleteFolderAction } from '@/server/folders/actions';
import type { FolderTargetInput } from '@/server/folders/types';

const isOpenFolderDeleted = (
  routeFolderPath: string | null,
  deletedPath: string,
) => {
  if (routeFolderPath === null) return false;
  return isSameOrDescendantFolderPath(routeFolderPath, deletedPath);
};

export const useDeleteFolderMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const projectId = useCurrentProjectId();
  const routeFolderPath = useRouteFolderPath();

  return useMutation({
    mutationKey: EvaluatorService.deleteFolderMutationKey,
    mutationFn: (input: FolderTargetInput) => deleteFolderAction(input),
    onSuccess: async (result, input) => {
      if (!result.ok) return;
      toast.success('Folder deleted successfully');
      if (isOpenFolderDeleted(routeFolderPath, input.path)) {
        router.push(
          UrlGenerator.evaluators({ values: { project: projectId } }),
        );
      }
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: EvaluatorService.foldersKey,
        }),
        queryClient.invalidateQueries({ queryKey: EvaluatorService.listKey }),
      ]);
    },
  });
};
