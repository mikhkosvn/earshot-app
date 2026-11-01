'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { EvaluatorService } from '@/app/(app)/test-case/_service';

import { useRouteFolderId } from './use-route-folder-id';

export const useRouteFolderPath = () => {
  const projectId = useCurrentProjectId();
  const folderId = useRouteFolderId();
  const { data: folderPath } = useSuspenseQuery({
    ...EvaluatorService.getFoldersQuery({ projectId }),
    select: (folders) =>
      folders.find((folder) => folder.id === folderId)?.path ?? null,
  });
  return folderPath;
};
