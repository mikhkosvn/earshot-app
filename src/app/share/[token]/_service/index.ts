import { queryOptions } from '@tanstack/react-query';

import { deferAction } from '@/lib/query-client/defer-action';
import {
  getSharedResultAction,
  getSharedRunAction,
  getSharedViewAction,
  listSharedRunsAction,
} from '@/server/share-links/actions';
import type {
  SharedRunInput,
  SharedRunsInput,
  ShareLinkTokenInput,
} from '@/server/share-links/types';

export const ShareKey = {
  view: 'share-view',
  result: 'share-result',
  runs: 'share-runs',
  run: 'share-run',
} as const;

export type ShareKey = (typeof ShareKey)[keyof typeof ShareKey];

export class ShareService {
  static getViewQuery(args: ShareLinkTokenInput) {
    return queryOptions({
      queryKey: [ShareKey.view, args],
      queryFn: () => deferAction(() => getSharedViewAction(args)),
    });
  }

  static getResultQuery(args: ShareLinkTokenInput) {
    return queryOptions({
      queryKey: [ShareKey.result, args],
      queryFn: () => deferAction(() => getSharedResultAction(args)),
    });
  }

  static getRunsQuery(args: SharedRunsInput) {
    return queryOptions({
      queryKey: [ShareKey.runs, args],
      queryFn: () => deferAction(() => listSharedRunsAction(args)),
    });
  }

  static getRunQuery(args: SharedRunInput) {
    return queryOptions({
      queryKey: [ShareKey.run, args],
      queryFn: () => deferAction(() => getSharedRunAction(args)),
    });
  }
}
