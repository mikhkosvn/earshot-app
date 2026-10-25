import { queryOptions } from '@tanstack/react-query';

import { deferAction } from '@/lib/query-client/defer-action';
import {
  getProjectKnowledgeAction,
  listProjectKnowledgeVersionsAction,
} from '@/server/project-knowledge/actions';

export const KnowledgeKey = {
  current: 'project-knowledge',
  versions: 'project-knowledge-versions',
  save: 'save-project-knowledge',
} as const;

export type KnowledgeKey = (typeof KnowledgeKey)[keyof typeof KnowledgeKey];

export class KnowledgeService {
  static readonly saveKnowledgeMutationKey = [KnowledgeKey.save];

  static getKnowledgeQuery(args: { projectId: number }) {
    return queryOptions({
      queryKey: [KnowledgeKey.current, args],
      queryFn: () => deferAction(() => getProjectKnowledgeAction(args)),
    });
  }

  static getVersionsQuery(args: { projectId: number }) {
    return queryOptions({
      queryKey: [KnowledgeKey.versions, args],
      queryFn: () =>
        deferAction(() => listProjectKnowledgeVersionsAction(args)),
    });
  }
}
