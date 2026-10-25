import type { MonitorScenarioFolder } from '@/server/monitors/types';

export const FolderSelection = {
  none: 'none',
  some: 'some',
  all: 'all',
} as const;

export type FolderSelection =
  (typeof FolderSelection)[keyof typeof FolderSelection];

export const toggleId = (ids: number[], id: number) => {
  if (ids.includes(id)) return ids.filter((item) => item !== id);
  return [...ids, id];
};

export const countSelectedInFolder = (
  folder: MonitorScenarioFolder,
  selectedIds: number[],
) =>
  folder.scenarios.filter((scenario) => selectedIds.includes(scenario.id))
    .length;

export const folderSelection = (
  folder: MonitorScenarioFolder,
  selectedIds: number[],
): FolderSelection => {
  const count = countSelectedInFolder(folder, selectedIds);
  if (count === 0) return FolderSelection.none;
  if (count === folder.scenarios.length) return FolderSelection.all;
  return FolderSelection.some;
};

export const toggleFolder = (
  folder: MonitorScenarioFolder,
  selectedIds: number[],
) => {
  const folderIds = folder.scenarios.map((scenario) => scenario.id);
  if (folderSelection(folder, selectedIds) === FolderSelection.all) {
    return selectedIds.filter((id) => !folderIds.includes(id));
  }
  return [...new Set([...selectedIds, ...folderIds])];
};

export const filterScenarios = (
  folder: MonitorScenarioFolder,
  search: string,
) => {
  const query = search.trim().toLowerCase();
  if (!query) return folder.scenarios;
  return folder.scenarios.filter(
    (scenario) =>
      scenario.name.toLowerCase().includes(query) ||
      String(scenario.id).includes(query),
  );
};
