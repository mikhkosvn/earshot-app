export const FilterLogic = {
  and: 'and',
  or: 'or',
} as const;

export type FilterLogic = (typeof FilterLogic)[keyof typeof FilterLogic];

export const FilterOperator = {
  eq: 'eq',
  neq: 'neq',
  gt: 'gt',
  gte: 'gte',
  lt: 'lt',
  lte: 'lte',
  contains: 'contains',
  startswith: 'startswith',
  in: 'in',
  isnull: 'isnull',
} as const;

export type FilterOperator =
  (typeof FilterOperator)[keyof typeof FilterOperator];

export const CallFilterField = {
  timestamp: 'timestamp',
  agent: 'agent',
  agentId: 'agent.id',
  status: 'status',
  success: 'success',
  isReviewed: 'is_reviewed',
  callId: 'call_id',
  customerNumber: 'customer_number',
  callEndedReason: 'call_ended_reason',
  feedback: 'feedback',
  metricId: 'metric_evaluations.metric.id',
  metricValue: 'metric_evaluations.value',
} as const;

export type CallFilterField =
  (typeof CallFilterField)[keyof typeof CallFilterField];

export const METADATA_FIELD_PREFIX = 'metadata.';

export const METRIC_FIELD_PREFIX = 'metric_evaluations.';

export const FILTER_OPERATOR_LABEL: Record<FilterOperator, string> = {
  [FilterOperator.eq]: 'equals',
  [FilterOperator.neq]: 'not equals',
  [FilterOperator.gt]: 'greater than',
  [FilterOperator.gte]: 'greater or equal',
  [FilterOperator.lt]: 'less than',
  [FilterOperator.lte]: 'less or equal',
  [FilterOperator.contains]: 'contains',
  [FilterOperator.startswith]: 'starts with',
  [FilterOperator.in]: 'in',
  [FilterOperator.isnull]: 'is empty',
};
