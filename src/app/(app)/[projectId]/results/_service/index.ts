import { queryOptions } from '@tanstack/react-query';

import { deferAction } from '@/lib/query-client/defer-action';
import {
  getResultAction,
  getResultStatusAction,
  getRunAction,
  listResultFilterOptionsAction,
  listResultsAction,
  listRunsAction,
} from '@/server/results/actions';
import type {
  ListResultsInput,
  ListRunsInput,
  ProjectScopeInput,
  ResultIdInput,
  RunIdInput,
} from '@/server/results/types';

export const ResultKey = {
  list: 'result-list',
  runs: 'result-runs',
  filterOptions: 'result-filter-options',
  detail: 'result-detail',
  status: 'result-status',
  run: 'result-run',
  deleteResults: 'result-delete',
  renameResult: 'result-rename',
  exportResults: 'result-export',
  deleteRuns: 'result-delete-runs',
  updateRunEvaluation: 'result-update-run-evaluation',
  updateRunFeedback: 'result-update-run-feedback',
  createShareLink: 'result-create-share-link',
  addRunsToLab: 'result-add-runs-to-lab',
  reevaluate: 'result-reevaluate',
  runSelected: 'result-run-selected',
} as const;

export type ResultKey = (typeof ResultKey)[keyof typeof ResultKey];

export class ResultService {
  static readonly listKey = [ResultKey.list];
  static readonly runsKey = [ResultKey.runs];
  static readonly detailKey = [ResultKey.detail];
  static readonly statusKey = [ResultKey.status];
  static readonly runKey = [ResultKey.run];
  static readonly deleteResultsMutationKey = [ResultKey.deleteResults];
  static readonly renameResultMutationKey = [ResultKey.renameResult];
  static readonly exportResultsMutationKey = [ResultKey.exportResults];
  static readonly deleteRunsMutationKey = [ResultKey.deleteRuns];
  static readonly updateRunEvaluationMutationKey = [
    ResultKey.updateRunEvaluation,
  ];
  static readonly updateRunFeedbackMutationKey = [ResultKey.updateRunFeedback];
  static readonly createShareLinkMutationKey = [ResultKey.createShareLink];
  static readonly addRunsToLabMutationKey = [ResultKey.addRunsToLab];
  static readonly reevaluateMutationKey = [ResultKey.reevaluate];
  static readonly runSelectedMutationKey = [ResultKey.runSelected];

  static getListQuery(args: ListResultsInput) {
    return queryOptions({
      queryKey: [ResultKey.list, args],
      queryFn: () => deferAction(() => listResultsAction(args)),
    });
  }

  static getRunsQuery(args: ListRunsInput) {
    return queryOptions({
      queryKey: [ResultKey.runs, args],
      queryFn: () => deferAction(() => listRunsAction(args)),
    });
  }

  static getFilterOptionsQuery(args: ProjectScopeInput) {
    return queryOptions({
      queryKey: [ResultKey.filterOptions, args],
      queryFn: () => deferAction(() => listResultFilterOptionsAction(args)),
    });
  }

  static getDetailQuery(args: ResultIdInput) {
    return queryOptions({
      queryKey: [ResultKey.detail, args],
      queryFn: () => deferAction(() => getResultAction(args)),
    });
  }

  static getStatusQuery(args: ResultIdInput) {
    return queryOptions({
      queryKey: [ResultKey.status, args],
      queryFn: () => deferAction(() => getResultStatusAction(args)),
    });
  }

  static getRunQuery(args: RunIdInput) {
    return queryOptions({
      queryKey: [ResultKey.run, args],
      queryFn: () => deferAction(() => getRunAction(args)),
    });
  }
}
