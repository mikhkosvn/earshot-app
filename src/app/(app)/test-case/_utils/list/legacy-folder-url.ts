import type { Route } from 'next';

import { legacyFolderParams } from '@/app/(app)/test-case/_constants/evaluator-list-params';
import type { FolderView } from '@/server/folders/types';

import { folderListUrl } from './folder-list-url';

type SearchParams = Record<string, string | string[] | undefined>;

const keptQuery = (searchParams: SearchParams) => {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(searchParams)) {
    if (key in legacyFolderParams || value === undefined) continue;
    for (const item of [value].flat()) query.append(key, item);
  }
  return query.toString();
};

export const legacyFolderUrl = (
  folders: FolderView[],
  folderPath: string,
  searchParams: SearchParams,
) => {
  const route = folderListUrl(folders, folderPath);
  const query = keptQuery(searchParams);
  if (!query) return route;
  return `${route}?${query}` as Route;
};
