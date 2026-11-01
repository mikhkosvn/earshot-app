'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { EvaluatorService } from '@/app/(app)/test-case/_service';
import { folderListUrl } from '@/app/(app)/test-case/_utils/list/folder-list-url';
import type { EvaluatorsType } from '@/lib/url-generator/types';

export const useFolderListUrl = () => {
  const projectId = useCurrentProjectId();
  const { data: folders } = useSuspenseQuery(
    EvaluatorService.getFoldersQuery({ projectId }),
  );
  return (folderPath: string, values: EvaluatorsType['values']) =>
    folderListUrl(folders, folderPath, values);
};
