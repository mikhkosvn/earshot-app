import { queryOptions } from '@tanstack/react-query';

import { deferAction } from '@/lib/query-client/defer-action';
import { listSavedViewsAction } from '@/server/saved-views/actions';
import type { SavedViewItem } from '@/server/saved-views/types';

export const ResultSavedViewKey = {
  list: 'result-saved-views',
} as const;

export type ResultSavedViewKey =
  (typeof ResultSavedViewKey)[keyof typeof ResultSavedViewKey];

export const savedViewsQuery = (projectId: number) =>
  queryOptions({
    queryKey: [ResultSavedViewKey.list, projectId],
    queryFn: () => deferAction(() => listSavedViewsAction({ projectId })),
  });

const sameIds = (left: number[], right: number[]) => {
  if (left.length !== right.length) return false;
  const rightIds = new Set(right);
  return left.every((id) => rightIds.has(id));
};

export const matchSavedView = (
  views: SavedViewItem[],
  agentIds: number[],
) => {
  if (agentIds.length === 0) return undefined;
  return views.find((view) => sameIds(view.agentIds, agentIds));
};
