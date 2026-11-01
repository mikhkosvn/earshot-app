'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';

import { usePendingFolderCreates } from '../../_hooks/folders/use-pending-folder-creates';
import { EvaluatorService } from '../../_service';
import { withPendingFolders } from '../../_utils/folders/folder-list-entries';
import { AllEvaluatorsRow } from './all-evaluators-row';
import { FolderListEntryRow } from './row/folder-list-entry-row';
import { FolderRow } from './row/folder-row';

interface FolderListProps {
  search: string;
}

export function FolderList({ search }: FolderListProps) {
  const projectId = useCurrentProjectId();
  const { data: folders } = useSuspenseQuery(
    EvaluatorService.getFoldersQuery({ projectId }),
  );
  const pendingCreates = usePendingFolderCreates();
  const needle = search.trim().toLowerCase();
  const matches = (path: string) => path.toLowerCase().includes(needle);
  const pinned = folders.filter(
    (folder) => folder.isRegressionSuite && matches(folder.path),
  );
  const others = withPendingFolders(
    folders.filter((folder) => !folder.isRegressionSuite),
    pendingCreates,
  ).filter((entry) => matches(entry.path));

  return (
    <nav aria-label="Folders" className="flex flex-col gap-0.5">
      {pinned.map((folder) => (
        <FolderRow key={folder.id} folder={folder} />
      ))}
      <AllEvaluatorsRow />
      {others.map((entry) => (
        <FolderListEntryRow key={entry.key} entry={entry} />
      ))}
    </nav>
  );
}
