export const RESULT_PAGE_SIZE_MAX = 100;

export const RESULT_EXPORT_ROW_MAX = 5000;

export const RunSortField = {
  id: 'id',
  evaluatorName: 'evaluatorName',
  startTime: 'startTime',
  evaluation: 'evaluation',
  personality: 'personality',
  testProfile: 'testProfile',
} as const;

export type RunSortField = (typeof RunSortField)[keyof typeof RunSortField];

export const SortDirection = {
  asc: 'asc',
  desc: 'desc',
} as const;

export type SortDirection = (typeof SortDirection)[keyof typeof SortDirection];

export const ResultRunType = {
  telephony: 'telephony',
} as const;

export type ResultRunType = (typeof ResultRunType)[keyof typeof ResultRunType];

export const ResultRunTypeLabel: Record<ResultRunType, string> = {
  [ResultRunType.telephony]: 'Telephony',
};

export const RESULT_CSV_FILE_NAME = 'results.csv';

export const DELETED_EVALUATOR_NAME = 'Evaluator deleted';
