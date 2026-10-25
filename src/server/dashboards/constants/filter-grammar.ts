export const FilterGroupOperator = {
  and: 'and',
  or: 'or',
  same_row: 'same_row',
} as const;

export type FilterGroupOperator =
  (typeof FilterGroupOperator)[keyof typeof FilterGroupOperator];

export const FilterOp = {
  eq: 'eq',
  neq: 'neq',
  gte: 'gte',
  lte: 'lte',
} as const;

export type FilterOp = (typeof FilterOp)[keyof typeof FilterOp];

export const FilterField = {
  timestamp: 'timestamp',
  agentId: 'agent.id',
  success: 'success',
} as const;

export type FilterField = (typeof FilterField)[keyof typeof FilterField];

export const METADATA_FIELD_PREFIX = 'metadata.';
