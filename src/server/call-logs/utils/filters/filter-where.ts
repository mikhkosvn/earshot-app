import 'server-only';

import type { Prisma } from '@/generated/prisma/client';
import { parseTimeExpression } from '@/lib/time-range/parse-time-expression';
import {
  CallFilterField,
  FilterLogic,
  METADATA_FIELD_PREFIX,
  METRIC_FIELD_PREFIX,
} from '@/server/call-logs/constants/call-filter';
import { metadataWhere } from '@/server/call-logs/utils/filters/metadata-filter';
import { metricConditionWhere } from '@/server/call-logs/utils/filters/metric-filter';
import {
  dateFilter,
  filterError,
  nullableIdFilter,
  nullableTextFilter,
  textFilter,
} from '@/server/call-logs/utils/filters/scalar-filter';
import {
  reviewedWhere,
  statusWhere,
  successWhere,
} from '@/server/call-logs/utils/filters/status-filter';
import type {
  FilterCondition,
  FilterGroup,
  FilterNode,
} from '@/server/call-logs/types';

const isGroup = (node: FilterNode): node is FilterGroup => 'conditions' in node;

const isMetricField = (field: string) => field.startsWith(METRIC_FIELD_PREFIX);

const isMetricCondition = (node: FilterNode): node is FilterCondition =>
  !isGroup(node) && isMetricField(node.field);

const timestampWhere = (
  condition: FilterCondition,
  now: Date,
): Prisma.CallLogWhereInput => {
  const date = parseTimeExpression(String(condition.value ?? ''), now);
  if (!date) throw filterError(condition.field);
  return { conversation: { startedAt: dateFilter(condition, date) } };
};

const conditionWhere = (
  condition: FilterCondition,
  now: Date,
): Prisma.CallLogWhereInput => {
  if (condition.field.startsWith(METADATA_FIELD_PREFIX)) {
    return metadataWhere(
      condition,
      condition.field.slice(METADATA_FIELD_PREFIX.length),
    );
  }
  if (isMetricField(condition.field)) {
    return {
      conversation: {
        metricEvaluations: { some: metricConditionWhere(condition) },
      },
    };
  }
  switch (condition.field) {
    case CallFilterField.timestamp:
      return timestampWhere(condition, now);
    case CallFilterField.agent:
    case CallFilterField.agentId:
      return { agentId: nullableIdFilter(condition) };
    case CallFilterField.status:
      return statusWhere(condition);
    case CallFilterField.success:
      return successWhere(condition);
    case CallFilterField.isReviewed:
      return reviewedWhere(condition);
    case CallFilterField.callId:
      return { externalCallId: textFilter(condition) };
    case CallFilterField.customerNumber:
      return { customerNumber: nullableTextFilter(condition) };
    case CallFilterField.feedback:
      return { feedback: nullableTextFilter(condition) };
    case CallFilterField.callEndedReason:
      return { conversation: { endedReason: nullableTextFilter(condition) } };
    default:
      throw filterError(condition.field);
  }
};

const metricGroupWhere = (
  group: FilterGroup,
  conditions: FilterCondition[],
): Prisma.CallLogWhereInput => {
  const parts = conditions.map(metricConditionWhere);
  if (group.operator === FilterLogic.or) {
    return { conversation: { metricEvaluations: { some: { OR: parts } } } };
  }
  return { conversation: { metricEvaluations: { some: { AND: parts } } } };
};

export const filterNodeWhere = (
  node: FilterNode,
  now: Date,
): Prisma.CallLogWhereInput => {
  if (!isGroup(node)) return conditionWhere(node, now);
  const metricConditions = node.conditions.filter(isMetricCondition);
  if (
    metricConditions.length > 0 &&
    metricConditions.length === node.conditions.length
  ) {
    return metricGroupWhere(node, metricConditions);
  }
  const parts = node.conditions.map((child) => filterNodeWhere(child, now));
  if (node.operator === FilterLogic.or) return { OR: parts };
  return { AND: parts };
};
