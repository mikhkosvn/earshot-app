import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { AlertType } from '@/generated/prisma/enums';
import { prisma } from '@/lib/prisma';
import { MILLISECONDS_PER_HOUR } from '@/server/alerts/constants/alert-limits';
import {
  NEW_MODE_DEFAULT_MIN_CALLS,
  SPIKE_PRESETS,
  SensitivityPreset,
} from '@/server/alerts/constants/alert-presets';
import { checkSpike } from '@/server/alerts/evaluation/checks/spike-check';
import {
  type AlertFire,
  notifyAlertFires,
  recordAlertFire,
} from '@/server/alerts/evaluation/fire-alerts';
import {
  matchesAlertFilters,
  parseAlertFilters,
} from '@/server/alerts/utils/alert-filters';
import { alertMessage } from '@/server/alerts/utils/alert-message';

const ruleSelect = {
  id: true,
  name: true,
  type: true,
  filters: true,
  createdAt: true,
  minCalls: true,
  minCount: true,
  multiplier: true,
  windowHours: true,
  baselineHours: true,
  metric: { select: { id: true, name: true, projectId: true } },
} satisfies Prisma.AlertRuleSelect;

type InsightRule = Prisma.AlertRuleGetPayload<{ select: typeof ruleSelect }>;

const assignmentSelect = {
  categoryId: true,
  assignedAt: true,
  metricEvaluation: {
    select: {
      conversation: {
        select: { metadata: true, callLog: { select: { agentId: true } } },
      },
    },
  },
} satisfies Prisma.FailureCategoryAssignmentSelect;

type AssignmentRecord = Prisma.FailureCategoryAssignmentGetPayload<{
  select: typeof assignmentSelect;
}>;

const balanced = SPIKE_PRESETS[SensitivityPreset.balanced];

const ruleRef = (rule: InsightRule) => ({
  id: rule.id,
  name: rule.name,
  projectId: rule.metric.projectId,
});

const matching = (rule: InsightRule, rows: AssignmentRecord[]) => {
  const filters = parseAlertFilters(rule.filters);
  return rows.filter((row) =>
    matchesAlertFilters(filters, {
      agentId: row.metricEvaluation.conversation.callLog?.agentId ?? null,
      metadata: row.metricEvaluation.conversation.metadata,
    }),
  );
};

const countByCategory = (rows: AssignmentRecord[]) => {
  const counts = new Map<number, number>();
  rows.forEach((row) =>
    counts.set(row.categoryId, (counts.get(row.categoryId) ?? 0) + 1),
  );
  return counts;
};

const newModeFires = async (rule: InsightRule): Promise<AlertFire[]> => {
  const categories = await prisma.failureCategory.findMany({
    where: {
      metricId: rule.metric.id,
      dismissedAt: null,
      createdAt: { gte: rule.createdAt },
      alertTriggers: { none: { alertRuleId: rule.id } },
    },
    select: { id: true, name: true },
  });
  if (categories.length === 0) return [];
  const rows = await prisma.failureCategoryAssignment.findMany({
    where: { categoryId: { in: categories.map((category) => category.id) } },
    select: assignmentSelect,
  });
  const counts = countByCategory(matching(rule, rows));
  const minCalls = rule.minCalls ?? NEW_MODE_DEFAULT_MIN_CALLS;
  return categories.flatMap((category) => {
    const calls = counts.get(category.id) ?? 0;
    if (calls < minCalls) return [];
    return [
      {
        rule: ruleRef(rule),
        message: alertMessage.newCategory(
          rule.metric.name,
          category.name,
          calls,
        ),
        observedValue: calls,
        conversationId: null,
        metricEvaluationId: null,
        failureCategoryId: category.id,
      },
    ];
  });
};

const spikeFires = async (rule: InsightRule): Promise<AlertFire[]> => {
  const windowHours = rule.windowHours ?? balanced.windowHours;
  const baselineHours = rule.baselineHours ?? balanced.baselineHours;
  const now = Date.now();
  const windowStart = new Date(now - windowHours * MILLISECONDS_PER_HOUR);
  const baselineStart = new Date(
    windowStart.getTime() - baselineHours * MILLISECONDS_PER_HOUR,
  );
  const rows = await prisma.failureCategoryAssignment.findMany({
    where: {
      assignedAt: { gte: baselineStart },
      category: { metricId: rule.metric.id, dismissedAt: null },
    },
    select: assignmentSelect,
  });
  const kept = matching(rule, rows);
  const recent = countByCategory(
    kept.filter((row) => row.assignedAt >= windowStart),
  );
  const baseline = countByCategory(
    kept.filter((row) => row.assignedAt < windowStart),
  );
  const recentFires = await prisma.alertTrigger.findMany({
    where: { alertRuleId: rule.id, triggeredAt: { gte: windowStart } },
    select: { failureCategoryId: true },
  });
  const firedIds = new Set(recentFires.map((fire) => fire.failureCategoryId));
  const categories = await prisma.failureCategory.findMany({
    where: { id: { in: [...recent.keys()] } },
    select: { id: true, name: true },
  });
  return categories.flatMap((category) => {
    if (firedIds.has(category.id)) return [];
    const recentCount = recent.get(category.id) ?? 0;
    const result = checkSpike({
      recentCount,
      baselineCount: baseline.get(category.id) ?? 0,
      windowHours,
      baselineHours,
      minCount: rule.minCount ?? balanced.minCount,
      multiplier: rule.multiplier ?? balanced.multiplier,
    });
    if (!result.fired) return [];
    return [
      {
        rule: ruleRef(rule),
        message: alertMessage.spike(
          rule.metric.name,
          category.name,
          recentCount,
          windowHours,
          result.ratio,
        ),
        observedValue: recentCount,
        conversationId: null,
        metricEvaluationId: null,
        failureCategoryId: category.id,
      },
    ];
  });
};

const firesOf = (rule: InsightRule) => {
  if (rule.type === AlertType.insight_new_mode) return newModeFires(rule);
  return spikeFires(rule);
};

export const evaluateInsightAlerts = async (projectId?: number) => {
  const rules = await prisma.alertRule.findMany({
    where: {
      enabled: true,
      type: { in: [AlertType.insight_new_mode, AlertType.insight_uptick] },
      ...(projectId !== undefined && { metric: { projectId } }),
    },
    orderBy: { id: Prisma.SortOrder.asc },
    select: ruleSelect,
  });
  const fired: AlertFire[] = [];
  for (const rule of rules) {
    for (const fire of await firesOf(rule)) {
      if (await recordAlertFire(fire)) fired.push(fire);
    }
  }
  await notifyAlertFires(fired);
  return { fired: fired.length };
};
