import { CallEvaluationStatus, RunStatus } from '@/generated/prisma/enums';

import type { ResultFilterParams } from '../filters-input';

export const ResultFilterField = {
  agent: 'agent',
  evaluator: 'evaluator',
  tag: 'tag',
  status: 'status',
  evaluation: 'evaluation',
} as const;

export type ResultFilterField =
  (typeof ResultFilterField)[keyof typeof ResultFilterField];

export const ResultFilterFieldLabel: Record<ResultFilterField, string> = {
  [ResultFilterField.agent]: 'Agent',
  [ResultFilterField.evaluator]: 'Evaluator',
  [ResultFilterField.tag]: 'Tag',
  [ResultFilterField.status]: 'Status',
  [ResultFilterField.evaluation]: 'Evaluation',
};

export interface ResultFilterDraft {
  id: string;
  field: ResultFilterField;
  value: string;
}

export const newResultFilterDraft = (
  field: ResultFilterField = ResultFilterField.agent,
  value = '',
): ResultFilterDraft => ({ id: crypto.randomUUID(), field, value });

export const findResultFilterField = (value: string) =>
  Object.values(ResultFilterField).find((field) => field === value);

const findRunStatus = (value: string) =>
  Object.values(RunStatus).find((status) => status === value);

const findEvaluationStatus = (value: string) =>
  Object.values(CallEvaluationStatus).find((status) => status === value);

const isPresent = <T>(value: T | undefined): value is T => value !== undefined;

export const paramsToDrafts = (
  params: ResultFilterParams,
): ResultFilterDraft[] => [
  ...params.agent.map((id) =>
    newResultFilterDraft(ResultFilterField.agent, String(id)),
  ),
  ...params.evaluator.map((id) =>
    newResultFilterDraft(ResultFilterField.evaluator, String(id)),
  ),
  ...params.tag.map((tag) => newResultFilterDraft(ResultFilterField.tag, tag)),
  ...params.status.map((status) =>
    newResultFilterDraft(ResultFilterField.status, status),
  ),
  ...params.evaluation.map((status) =>
    newResultFilterDraft(ResultFilterField.evaluation, status),
  ),
];

const valuesOf = (drafts: ResultFilterDraft[], field: ResultFilterField) => [
  ...new Set(
    drafts
      .filter((draft) => draft.field === field && draft.value !== '')
      .map((draft) => draft.value),
  ),
];

export const draftsToParams = (
  drafts: ResultFilterDraft[],
): ResultFilterParams => ({
  agent: valuesOf(drafts, ResultFilterField.agent).map(Number),
  evaluator: valuesOf(drafts, ResultFilterField.evaluator).map(Number),
  tag: valuesOf(drafts, ResultFilterField.tag),
  status: valuesOf(drafts, ResultFilterField.status)
    .map(findRunStatus)
    .filter(isPresent),
  evaluation: valuesOf(drafts, ResultFilterField.evaluation)
    .map(findEvaluationStatus)
    .filter(isPresent),
});

export const EMPTY_RESULT_FILTER_PARAMS: ResultFilterParams = {
  agent: [],
  evaluator: [],
  tag: [],
  status: [],
  evaluation: [],
};
