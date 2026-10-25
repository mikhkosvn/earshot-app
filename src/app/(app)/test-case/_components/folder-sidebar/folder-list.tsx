'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';

import { EvaluatorService } from '../../_service';
import { AllEvaluatorsRow } from './all-evaluators-row';
import { FolderRow } from './folder-row';

interface FolderListProps {
  search: string;
}

export function FolderList({ search }: FolderListProps) {
  const projectId = useCurrentProjectId();
  const { data: folders } = useSuspenseQuery(
    EvaluatorService.getFoldersQuery({ projectId }),
  );
  const needle = search.trim().toLowerCase();
  const visible = folders.filter((folder) =>
    folder.path.toLowerCase().includes(needle),
  );
  const pinned = visible.filter((folder) => folder.isRegressionSuite);
  const others = visible.filter((folder) => !folder.isRegressionSuite);

  return (
    <nav aria-label="Folders" className="flex flex-col gap-0.5">
      {pinned.map((folder) => (
        <FolderRow key={folder.id} folder={folder} />
      ))}
      <AllEvaluatorsRow />
      {others.map((folder) => (
        <FolderRow key={folder.id} folder={folder} />
      ))}
    </nav>
  );
}
