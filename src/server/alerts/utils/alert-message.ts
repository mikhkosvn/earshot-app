import 'server-only';

import {
  ChangeDirection,
  type ThresholdOperator,
} from '@/generated/prisma/enums';
import { ThresholdOperatorLabel } from '@/server/alerts/constants/threshold-operator-labels';
import { evaluationValueOf } from '@/server/alerts/utils/evaluation-value';
import type { EvaluationValueParts } from '@/server/alerts/utils/evaluation-value';
import { round2 } from '@/server/metric-scoring/utils/statistics';

type CallRef = EvaluationValueParts & {
  conversation: {
    callLog: { id: number; externalCallId: string } | null;
  };
};

type ThresholdRule = {
  metric: { name: string };
  thresholdOperator: ThresholdOperator | null;
  thresholdValue: number | null;
  thresholdUpperValue: number | null;
};

const callText = (row: CallRef) => {
  const callLog = row.conversation.callLog;
  if (!callLog) return 'a call';
  if (callLog.externalCallId) return `call ${callLog.externalCallId}`;
  return `call #${callLog.id}`;
};

const valueText = (row: EvaluationValueParts) => {
  const value = evaluationValueOf(row);
  if (value === null) return 'no value';
  if (typeof value === 'number') return String(round2(value));
  return String(value);
};

const conditionText = (rule: ThresholdRule) => {
  const value = rule.thresholdValue ?? 0;
  if (rule.thresholdUpperValue !== null) {
    return `outside [${value}, ${rule.thresholdUpperValue}]`;
  }
  if (!rule.thresholdOperator) return String(value);
  return ThresholdOperatorLabel[rule.thresholdOperator].replace(
    'threshold',
    String(value),
  );
};

const changeText = (deviation: number) => {
  if (deviation > 0) return ChangeDirection.increase;
  return ChangeDirection.decrease;
};

const numberText = (value: number | null) => String(round2(value ?? 0));

export const alertMessage = {
  failure: (metricName: string, row: CallRef) =>
    `${metricName} failed on ${callText(row)}. Value: ${valueText(row)}.`,
  threshold: (
    rule: ThresholdRule,
    result: { breaches: number; latest: number | null },
    windowCount: number,
  ) =>
    `${rule.metric.name} crossed "${conditionText(rule)}" in ${result.breaches} of the last ${windowCount} calls. Latest value: ${numberText(result.latest)}.`,
  trend: (
    metricName: string,
    result: {
      baseline: number | null;
      windowMean: number | null;
      deviation: number | null;
    },
  ) =>
    `${metricName} shows a significant ${changeText(result.deviation ?? 0)}: the window mean is ${numberText(result.windowMean)}, the baseline is ${numberText(result.baseline)}.`,
  newCategory: (metricName: string, categoryName: string, calls: number) =>
    `A new failure category "${categoryName}" appeared for ${metricName} in ${calls} call(s).`,
  spike: (
    metricName: string,
    categoryName: string,
    recentCount: number,
    windowHours: number,
    ratio: number,
  ) =>
    `The failure category "${categoryName}" of ${metricName} spiked: ${recentCount} call(s) in ${windowHours}h, ${numberText(ratio)}x the baseline.`,
};
