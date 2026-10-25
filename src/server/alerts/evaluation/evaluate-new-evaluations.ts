import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import {
  AlertType,
  ChangeDirection,
  EvaluationConsumer,
  MetricEvaluationStatus,
  ThresholdOperator,
} from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import {
  ALERT_EVALUATION_BATCH,
  TREND_HISTORY_FACTOR,
} from '@/server/alerts/constants/alert-limits';
import { checkThreshold } from '@/server/alerts/evaluation/checks/threshold-check';
import { checkTrend } from '@/server/alerts/evaluation/checks/trend-check';
import {
  type AlertFire,
  notifyAlertFires,
  recordAlertFire,
} from '@/server/alerts/evaluation/fire-alerts';
import { loadMetricHistory } from '@/server/alerts/evaluation/load-metric-history';
import {
  matchesAlertFilters,
  parseAlertFilters,
} from '@/server/alerts/utils/alert-filters';
import {
  readEvaluationCursor,
  settledPrefix,
  writeEvaluationCursor,
} from '@/server/alerts/utils/evaluation-cursor';
import {
  isFailingEvaluation,
  numericValueOf,
} from '@/server/alerts/utils/evaluation-value';
import { alertMessage } from '@/server/alerts/utils/alert-message';

const EVALUATION_TYPES: AlertType[] = [
  AlertType.normal,
  AlertType.threshold,
  AlertType.significant_change,
];

const evaluationSelect = {
  id: true,
  status: true,
  createdAt: true,
  metricId: true,
  conversationId: true,
  valueNumber: true,
  valueBoolean: true,
  valueText: true,
  conversation: {
    select: {
      metadata: true,
      callLog: { select: { id: true, agentId: true, externalCallId: true } },
    },
  },
} satisfies Prisma.MetricEvaluationSelect;

export type CandidateEvaluation = Prisma.MetricEvaluationGetPayload<{
  select: typeof evaluationSelect;
}>;

const ruleSelect = {
  id: true,
  name: true,
  type: true,
  filters: true,
  direction: true,
  thresholdOperator: true,
  thresholdValue: true,
  thresholdUpperValue: true,
  minBreaches: true,
  windowSize: true,
  stdMultiplier: true,
  ewmaAlpha: true,
  metric: {
    select: {
      id: true,
      name: true,
      projectId: true,
      evalType: true,
      predefinedMetric: { select: { functionName: true } },
      rubricRule: {
        select: {
          operator: true,
          numberValue: true,
          booleanValue: true,
          textValues: true,
        },
      },
    },
  },
} satisfies Prisma.AlertRuleSelect;

export type EvaluationRule = Prisma.AlertRuleGetPayload<{
  select: typeof ruleSelect;
}>;

const fireOf = (
  rule: EvaluationRule,
  row: CandidateEvaluation,
  observedValue: number | null,
  message: string,
): AlertFire => ({
  rule: { id: rule.id, name: rule.name, projectId: rule.metric.projectId },
  message,
  observedValue,
  conversationId: row.conversationId,
  metricEvaluationId: row.id,
  failureCategoryId: null,
});

const firedInWindow = async (ruleId: number, evaluationIds: number[]) => {
  const trigger = await prisma.alertTrigger.findFirst({
    where: { alertRuleId: ruleId, metricEvaluationId: { in: evaluationIds } },
    select: { id: true },
  });
  return trigger !== null;
};

const checkFailure = (rule: EvaluationRule, row: CandidateEvaluation) => {
  if (!isFailingEvaluation(rule.metric, row)) return null;
  return fireOf(
    rule,
    row,
    numericValueOf(row),
    alertMessage.failure(rule.metric.name, row),
  );
};

const checkThresholdRule = async (
  rule: EvaluationRule,
  row: CandidateEvaluation,
) => {
  const windowSize = rule.windowSize ?? 1;
  const history = await loadMetricHistory(rule, row.id, windowSize);
  const result = checkThreshold({
    values: history.map((point) => point.value),
    operator: rule.thresholdOperator ?? ThresholdOperator.gt,
    value: rule.thresholdValue ?? 0,
    upperValue: rule.thresholdUpperValue,
    minBreaches: rule.minBreaches ?? 1,
  });
  if (!result.fired) return null;
  if (
    await firedInWindow(
      rule.id,
      history.map((point) => point.id),
    )
  ) {
    return null;
  }
  return fireOf(
    rule,
    row,
    result.latest,
    alertMessage.threshold(rule, result, history.length),
  );
};

const checkTrendRule = async (
  rule: EvaluationRule,
  row: CandidateEvaluation,
) => {
  const windowSize = rule.windowSize ?? 1;
  const points = await loadMetricHistory(
    rule,
    row.id,
    windowSize * (1 + TREND_HISTORY_FACTOR),
  );
  const window = points.slice(-windowSize);
  const result = checkTrend({
    history: points.slice(0, -windowSize).map((point) => point.value),
    window: window.map((point) => point.value),
    windowSize,
    stdMultiplier: rule.stdMultiplier ?? 2,
    ewmaAlpha: rule.ewmaAlpha ?? 0.3,
    direction: rule.direction ?? ChangeDirection.both,
  });
  if (!result.fired) return null;
  if (
    await firedInWindow(
      rule.id,
      window.map((point) => point.id),
    )
  ) {
    return null;
  }
  return fireOf(
    rule,
    row,
    result.windowMean,
    alertMessage.trend(rule.metric.name, result),
  );
};

const checkRule = (rule: EvaluationRule, row: CandidateEvaluation) => {
  if (rule.type === AlertType.normal) return checkFailure(rule, row);
  if (rule.type === AlertType.threshold) return checkThresholdRule(rule, row);
  return checkTrendRule(rule, row);
};

const isCallEvaluation = (row: CandidateEvaluation) =>
  row.status === MetricEvaluationStatus.completed &&
  row.conversation.callLog !== null;

const loadRules = (metricIds: number[]) =>
  prisma.alertRule.findMany({
    where: {
      enabled: true,
      metricId: { in: metricIds },
      type: { in: EVALUATION_TYPES },
    },
    orderBy: { id: Prisma.SortOrder.asc },
    select: ruleSelect,
  });

export const evaluateRulesForRows = async (rows: CandidateEvaluation[]) => {
  const candidates = rows.filter(isCallEvaluation);
  const metricIds = [...new Set(candidates.map((row) => row.metricId))];
  if (metricIds.length === 0) return [];
  const rules = await loadRules(metricIds);
  const fires: AlertFire[] = [];
  for (const row of candidates) {
    const call = {
      agentId: row.conversation.callLog?.agentId ?? null,
      metadata: row.conversation.metadata,
    };
    for (const rule of rules) {
      if (rule.metric.id !== row.metricId) continue;
      if (!matchesAlertFilters(parseAlertFilters(rule.filters), call)) continue;
      const fire = await checkRule(rule, row);
      if (fire && (await recordAlertFire(fire))) fires.push(fire);
    }
  }
  return fires;
};

export const evaluateNewEvaluations = async () => {
  const cursor = await readEvaluationCursor(EvaluationConsumer.alerts);
  const rows = await prisma.metricEvaluation.findMany({
    where: { id: { gt: cursor } },
    orderBy: { id: Prisma.SortOrder.asc },
    take: ALERT_EVALUATION_BATCH,
    select: evaluationSelect,
  });
  const ready = settledPrefix(rows);
  const last = ready.at(-1);
  if (!last) return { processed: 0, fired: 0 };
  const fires = await evaluateRulesForRows(ready);
  await writeEvaluationCursor(EvaluationConsumer.alerts, last.id);
  await notifyAlertFires(fires);
  return { processed: ready.length, fired: fires.length };
};
