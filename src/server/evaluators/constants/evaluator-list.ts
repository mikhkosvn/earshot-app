export const EvaluatorSortField = {
  id: 'id',
  name: 'name',
  personality: 'personality',
  agent: 'agent',
  testProfile: 'testProfile',
  language: 'language',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
} as const;

export type EvaluatorSortField =
  (typeof EvaluatorSortField)[keyof typeof EvaluatorSortField];

export const SortDirection = {
  asc: 'asc',
  desc: 'desc',
} as const;

export type SortDirection = (typeof SortDirection)[keyof typeof SortDirection];

export const SortDirectionLabel: Record<SortDirection, string> = {
  [SortDirection.asc]: 'ascending',
  [SortDirection.desc]: 'descending',
};

export const FilterLogic = {
  or: 'or',
  and: 'and',
} as const;

export type FilterLogic = (typeof FilterLogic)[keyof typeof FilterLogic];

export const FilterLogicLabel: Record<FilterLogic, string> = {
  [FilterLogic.or]: 'OR',
  [FilterLogic.and]: 'AND',
};

export const EVALUATOR_PAGE_SIZE_MAX = 500;

export const IMPROVE_SCOPE_OPTIONS = [10, 25, 50] as const;

export const IMPROVE_SCOPE_DEFAULT = 50;
