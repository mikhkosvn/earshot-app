import {
  CallFilterField,
  FilterOperator,
} from '@/server/call-logs/constants/call-filter';

export const FilterFieldKind = {
  agent: 'agent',
  status: 'status',
  text: 'text',
  metadata: 'metadata',
  metric: 'metric',
} as const;

export type FilterFieldKind =
  (typeof FilterFieldKind)[keyof typeof FilterFieldKind];

export const METADATA_FIELD_KEY = 'metadata';

export const METRIC_FIELD_KEY_PREFIX = 'metric:';

export interface FilterFieldOption {
  key: string;
  label: string;
  kind: FilterFieldKind;
}

export const FIXED_FILTER_FIELDS: FilterFieldOption[] = [
  { key: CallFilterField.agent, label: 'Agent', kind: FilterFieldKind.agent },
  {
    key: CallFilterField.status,
    label: 'Evaluation',
    kind: FilterFieldKind.status,
  },
  { key: CallFilterField.callId, label: 'Call ID', kind: FilterFieldKind.text },
  {
    key: CallFilterField.customerNumber,
    label: 'Customer',
    kind: FilterFieldKind.text,
  },
  {
    key: CallFilterField.callEndedReason,
    label: 'Ended Reason',
    kind: FilterFieldKind.text,
  },
  {
    key: CallFilterField.feedback,
    label: 'Feedback',
    kind: FilterFieldKind.text,
  },
  {
    key: METADATA_FIELD_KEY,
    label: 'Metadata',
    kind: FilterFieldKind.metadata,
  },
];

export const FILTER_KIND_OPERATORS: Record<FilterFieldKind, FilterOperator[]> =
  {
    [FilterFieldKind.agent]: [FilterOperator.eq, FilterOperator.neq],
    [FilterFieldKind.status]: [FilterOperator.eq, FilterOperator.neq],
    [FilterFieldKind.text]: [
      FilterOperator.eq,
      FilterOperator.neq,
      FilterOperator.contains,
      FilterOperator.startswith,
      FilterOperator.isnull,
    ],
    [FilterFieldKind.metadata]: [
      FilterOperator.eq,
      FilterOperator.neq,
      FilterOperator.contains,
      FilterOperator.startswith,
      FilterOperator.gt,
      FilterOperator.lt,
    ],
    [FilterFieldKind.metric]: [
      FilterOperator.eq,
      FilterOperator.neq,
      FilterOperator.gt,
      FilterOperator.gte,
      FilterOperator.lt,
      FilterOperator.lte,
    ],
  };
