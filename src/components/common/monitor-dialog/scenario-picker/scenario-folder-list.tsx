'use client';

import { useMonitorScenarios } from '../_hooks/use-monitor-scenarios';
import { ScenarioFolderRow } from './scenario-folder-row';

type ScenarioFolderListProps = {
  openFolders: string[];
  onOpenFoldersChange: (openFolders: string[]) => void;
  search: string;
  value: number[];
  onValueChange: (evaluatorIds: number[]) => void;
};

const changeOpenFolders = (
  openFolders: string[],
  key: string,
  isOpen: boolean,
) => {
  if (isOpen) return [...openFolders, key];
  return openFolders.filter((item) => item !== key);
};

export function ScenarioFolderList({
  openFolders,
  onOpenFoldersChange,
  search,
  value,
  onValueChange,
}: ScenarioFolderListProps) {
  const tree = useMonitorScenarios();
  if (tree.folders.length === 0) {
    return (
      <p className="px-3 py-6 text-center text-sm text-muted-foreground">
        No scenarios in this project.
      </p>
    );
  }

  return (
    <div className="max-h-72 overflow-y-auto p-1">
      {tree.folders.map((folder) => (
        <ScenarioFolderRow
          key={folder.key}
          folder={folder}
          isOpen={openFolders.includes(folder.key)}
          onOpenChange={(isOpen) =>
            onOpenFoldersChange(
              changeOpenFolders(openFolders, folder.key, isOpen),
            )
          }
          search={search}
          value={value}
          onValueChange={onValueChange}
        />
      ))}
    </div>
  );
}
