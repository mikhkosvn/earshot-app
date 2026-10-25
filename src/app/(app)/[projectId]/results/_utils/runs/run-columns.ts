import { RunSortField } from '@/server/results/constants/result-list';

export const RunColumn = {
  menu: 'menu',
  id: 'id',
  resultId: 'resultId',
  evaluatorName: 'evaluatorName',
  startTime: 'startTime',
  duration: 'duration',
  evaluation: 'evaluation',
  personality: 'personality',
  agent: 'agent',
  testProfile: 'testProfile',
  testingNumber: 'testingNumber',
  endedReason: 'endedReason',
  ringingDuration: 'ringingDuration',
  feedback: 'feedback',
} as const;

export type RunColumn = (typeof RunColumn)[keyof typeof RunColumn];

export const RUN_COLUMN_LABEL: Record<RunColumn, string> = {
  [RunColumn.menu]: '',
  [RunColumn.id]: 'ID',
  [RunColumn.resultId]: 'Result ID',
  [RunColumn.evaluatorName]: 'Evaluator Name',
  [RunColumn.startTime]: 'Run Start Time',
  [RunColumn.duration]: 'Duration',
  [RunColumn.evaluation]: 'Evaluation',
  [RunColumn.personality]: 'Personality',
  [RunColumn.agent]: 'Agent',
  [RunColumn.testProfile]: 'Test Profile',
  [RunColumn.testingNumber]: 'Testing Agent Number',
  [RunColumn.endedReason]: 'Call Ended Reason',
  [RunColumn.ringingDuration]: 'Ringing Duration',
  [RunColumn.feedback]: 'Feedback',
};

const RUN_COLUMN_SORT: Partial<Record<RunColumn, RunSortField>> = {
  [RunColumn.id]: RunSortField.id,
  [RunColumn.evaluatorName]: RunSortField.evaluatorName,
  [RunColumn.startTime]: RunSortField.startTime,
  [RunColumn.evaluation]: RunSortField.evaluation,
  [RunColumn.personality]: RunSortField.personality,
  [RunColumn.testProfile]: RunSortField.testProfile,
};

export const runColumnSortField = (column: RunColumn) =>
  RUN_COLUMN_SORT[column] ?? null;

export const RESULT_RUN_COLUMNS: RunColumn[] = [
  RunColumn.menu,
  RunColumn.id,
  RunColumn.evaluatorName,
  RunColumn.startTime,
  RunColumn.duration,
  RunColumn.evaluation,
  RunColumn.personality,
  RunColumn.testProfile,
  RunColumn.testingNumber,
  RunColumn.endedReason,
  RunColumn.ringingDuration,
  RunColumn.feedback,
];

export const PROJECT_RUN_COLUMNS: RunColumn[] = [
  RunColumn.menu,
  RunColumn.id,
  RunColumn.resultId,
  RunColumn.evaluatorName,
  RunColumn.startTime,
  RunColumn.duration,
  RunColumn.evaluation,
  RunColumn.personality,
  RunColumn.agent,
  RunColumn.testProfile,
  RunColumn.testingNumber,
  RunColumn.endedReason,
  RunColumn.ringingDuration,
  RunColumn.feedback,
];
