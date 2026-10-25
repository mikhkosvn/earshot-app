import 'server-only';

import { Prisma } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
import {
  ALERT_RECENT_FIRES,
  ALERT_REVIEW_FIRES_MAX,
  ALERT_TOP_SERIES,
  MILLISECONDS_PER_HOUR,
} from '@/server/alerts/constants/alert-limits';
import { ALERT_BUCKET_HOURS } from '@/server/alerts/constants/alert-window';
import { alertReviewSchema } from '@/server/alerts/schemas';
import type {
  AlertReview,
  AlertSeries,
  AlertTimelineBucket,
  FiredAlertSummary,
} from '@/server/alerts/types';
import { addEventFields } from '@/server/common/logging/event-fields';
import { withValidation } from '@/server/common/run-action';
import { requireProjectAccess } from '@/server/projects/utils/require-project-access';

const OTHER_SERIES: AlertSeries = { key: 'other', label: 'Other' };

const seriesKey = (alertId: number) => `alert-${alertId}`;

const bucketKeyOf = (alertId: number, topIds: Set<number>) => {
  if (topIds.has(alertId)) return seriesKey(alertId);
  return OTHER_SERIES.key;
};

const topAlertOf = (alerts: FiredAlertSummary[]) => {
  const [first] = alerts;
  if (!first) return null;
  return { id: first.id, name: first.name, count: first.count };
};

const fireSelect = {
  id: true,
  alertRuleId: true,
  triggeredAt: true,
  message: true,
  observedValue: true,
  conversation: { select: { callLog: { select: { id: true } } } },
  alertRule: {
    select: { name: true, type: true, metric: { select: { name: true } } },
  },
} satisfies Prisma.AlertTriggerSelect;

type FireRecord = Prisma.AlertTriggerGetPayload<{ select: typeof fireSelect }>;

const summarize = (fires: FireRecord[]): FiredAlertSummary[] => {
  const byAlert = new Map<number, FireRecord[]>();
  fires.forEach((fire) => {
    const list = byAlert.get(fire.alertRuleId) ?? [];
    list.push(fire);
    byAlert.set(fire.alertRuleId, list);
  });
  return [...byAlert.entries()]
    .map(([id, list]) => ({
      id,
      name: list[0].alertRule.name,
      metricName: list[0].alertRule.metric.name,
      type: list[0].alertRule.type,
      count: list.length,
      lastTriggeredAt: list[0].triggeredAt,
      recent: list.slice(0, ALERT_RECENT_FIRES).map((fire) => ({
        id: fire.id,
        triggeredAt: fire.triggeredAt,
        message: fire.message,
        observedValue: fire.observedValue,
        callLogId: fire.conversation?.callLog?.id ?? null,
      })),
    }))
    .toSorted(
      (left, right) =>
        right.count - left.count ||
        right.lastTriggeredAt.getTime() - left.lastTriggeredAt.getTime(),
    );
};

const buildTimeline = (
  fires: FireRecord[],
  start: number,
  bucketMs: number,
  bucketCount: number,
  topIds: Set<number>,
): AlertTimelineBucket[] => {
  const buckets = Array.from(
    { length: bucketCount },
    (_, index): AlertTimelineBucket => ({
      bucketStart: new Date(start + index * bucketMs),
      total: 0,
      counts: {},
    }),
  );
  fires.forEach((fire) => {
    const index = Math.min(
      bucketCount - 1,
      Math.max(0, Math.floor((fire.triggeredAt.getTime() - start) / bucketMs)),
    );
    const bucket = buckets[index];
    const key = bucketKeyOf(fire.alertRuleId, topIds);
    bucket.total += 1;
    bucket.counts[key] = (bucket.counts[key] ?? 0) + 1;
  });
  return buckets;
};

export const getAlertReview = withValidation(
  alertReviewSchema,
  async ({ projectId, hours }): Promise<AlertReview> => {
    await requireProjectAccess(projectId);
    const now = Date.now();
    const start = now - hours * MILLISECONDS_PER_HOUR;
    const fires = await prisma.alertTrigger.findMany({
      where: {
        triggeredAt: { gte: new Date(start) },
        alertRule: { metric: { projectId } },
      },
      orderBy: { triggeredAt: Prisma.SortOrder.desc },
      take: ALERT_REVIEW_FIRES_MAX,
      select: fireSelect,
    });
    const alerts = summarize(fires);
    addEventFields({
      project: { id: projectId },
      alert_review: { hours, fires: fires.length, alerts: alerts.length },
    });
    const top = alerts.slice(0, ALERT_TOP_SERIES);
    const topIds = new Set(top.map((alert) => alert.id));
    const series: AlertSeries[] = top.map((alert) => ({
      key: seriesKey(alert.id),
      label: alert.name,
    }));
    if (alerts.length > top.length) series.push(OTHER_SERIES);
    const bucketMs = ALERT_BUCKET_HOURS[hours] * MILLISECONDS_PER_HOUR;
    return {
      generatedAt: new Date(now),
      summary: {
        totalFires: fires.length,
        uniqueAlerts: alerts.length,
        topAlert: topAlertOf(alerts),
      },
      series,
      timeline: buildTimeline(
        fires,
        start,
        bucketMs,
        Math.round(hours / ALERT_BUCKET_HOURS[hours]),
        topIds,
      ),
      alerts,
    };
  },
);
