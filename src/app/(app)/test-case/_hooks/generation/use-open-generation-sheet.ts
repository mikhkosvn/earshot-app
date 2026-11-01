'use client';

import { useRouter } from 'next/navigation';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { useFolderListUrl } from '@/app/(app)/test-case/_hooks/folders/use-folder-list-url';

export const useOpenGenerationSheet = () => {
  const router = useRouter();
  const projectId = useCurrentProjectId();
  const folderListUrl = useFolderListUrl();

  return (sessionId: number, folderPath: string) => {
    router.push(
      folderListUrl(folderPath, {
        project: projectId,
        reopenSheet: true,
        sessionId,
      }),
    );
  };
};
