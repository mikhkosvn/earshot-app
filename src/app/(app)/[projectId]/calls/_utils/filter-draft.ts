import {
  CallFilterField,
  FilterLogic,
  FilterOperator,
  METADATA_FIELD_PREFIX,
} from '@/server/call-logs/constants/call-filter';
import type {
  CallMetricColumn,
  FilterCondition,
  FilterNode,
  FilterValue,
} from '@/server/call-logs/types';

import {
  FIXED_FILTER_FIELDS,
  FilterFieldKind,
  METADATA_FIELD_KEY,
  METRIC_FIELD_KEY_PREFIX,
  type FilterFieldOption,
} from '../_constants/call-filter-fields';

export type FilterDraft = {
  id: string;
  field: string;
  op: FilterOperator;
  value: string;
  metadataKey: string;
};

const NUMERIC_OPERATORS: FilterOperator[] = [
  FilterOperator.gt,
  FilterOperator.gte,
  FilterOperator.lt,
  FilterOperator.lte,
];

export const metricFieldKey = (metricId: number) =>
  `${METRIC_FIELD_KEY_PREFIX}${metricId}`;

export const filterFieldOptions = (
  metrics: CallMetricColumn[],
): FilterFieldOption[] => [
  ...FIXED_FILTER_FIELDS,
  ...metrics.map((metric) => ({
    key: metricFieldKey(metric.id),
    label: metric.name,
    kind: FilterFieldKind.metric,
  })),
];

export const newFilterDraft = (): FilterDraft => ({
  id: crypto.randomUUID(),
  field: CallFilterField.agent,
  op: FilterOperator.eq,
  value: '',
  metadataKey: '',
});

const isComplete = (draft: FilterDraft, kind: FilterFieldKind) => {
  if (kind === FilterFieldKind.metadata && !draft.metadataKey.trim()) {
    return false;
  }
  if (draft.op === FilterOperator.isnull) return true;
  return draft.value.trim() !== '';
};

const typedValue = (draft: FilterDraft): FilterValue => {
  const text = draft.value.trim();
  if (text === 'true') return true;
  if (text === 'false') return false;
  if (NUMERIC_OPERATORS.includes(draft.op)) return Number(text);
  if (text !== '' && Number.isFinite(Number(text))) return Number(text);
  return text;
};

const metricNode = (draft: FilterDraft): FilterNode => ({
  operator: FilterLogic.and,
  conditions: [
    {
      field: CallFilterField.metricId,
      op: FilterOperator.eq,
      value: Number(draft.field.slice(METRIC_FIELD_KEY_PREFIX.length)),
    },
    {
      field: CallFilterField.metricValue,
      op: draft.op,
      value: typedValue(draft),
    },
  ],
});

const draftNode = (draft: FilterDraft, kind: FilterFieldKind): FilterNode => {
  if (kind === FilterFieldKind.metric) return metricNode(draft);
  if (kind === FilterFieldKind.metadata) {
    return {
      field: `${METADATA_FIELD_PREFIX}${draft.metadataKey.trim()}`,
      op: draft.op,
      value: typedValue(draft),
    };
  }
  if (draft.op === FilterOperator.isnull) {
    return { field: draft.field, op: draft.op, value: true };
  }
  if (kind === FilterFieldKind.agent) {
    return { field: draft.field, op: draft.op, value: Number(draft.value) };
  }
  return { field: draft.field, op: draft.op, value: draft.value.trim() };
};

export const draftsToNodes = (
  drafts: FilterDraft[],
  options: FilterFieldOption[],
) =>
  drafts.flatMap((draft) => {
    const option = options.find((item) => item.key === draft.field);
    if (!option || !isComplete(draft, option.kind)) return [];
    return [draftNode(draft, option.kind)];
  });

const valueText = (value: FilterValue) => {
  if (value === null || Array.isArray(value)) return '';
  return String(value);
};

const conditionDraft = (condition: FilterCondition): FilterDraft => {
  const base = { ...newFilterDraft(), op: condition.op };
  if (condition.field.startsWith(METADATA_FIELD_PREFIX)) {
    return {
      ...base,
      field: METADATA_FIELD_KEY,
      metadataKey: condition.field.slice(METADATA_FIELD_PREFIX.length),
      value: valueText(condition.value),
    };
  }
  if (condition.op === FilterOperator.isnull) {
    return { ...base, field: condition.field };
  }
  return { ...base, field: condition.field, value: valueText(condition.value) };
};

const groupDraft = (conditions: FilterNode[]): FilterDraft[] => {
  const metric = conditions.find(
    (node) => 'field' in node && node.field === CallFilterField.metricId,
  );
  const value = conditions.find(
    (node) => 'field' in node && node.field === CallFilterField.metricValue,
  );
  if (!metric || !value || !('field' in metric) || !('field' in value)) {
    return [];
  }
  return [
    {
      ...newFilterDraft(),
      field: metricFieldKey(Number(metric.value)),
      op: value.op,
      value: valueText(value.value),
    },
  ];
};

export const nodesToDrafts = (nodes: FilterNode[]): FilterDraft[] =>
  nodes.flatMap((node) => {
    if ('conditions' in node) return groupDraft(node.conditions);
    return [conditionDraft(node)];
  });
