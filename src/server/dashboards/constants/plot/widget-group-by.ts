import { DashboardSource } from '@/generated/prisma/enums';

export const WidgetGroupBy = {
  none: 'none',
  success: 'success',
  is_reviewed: 'is_reviewed',
  duration: 'duration',
  call_ended_reason: 'call_ended_reason',
  topic: 'topic',
  dropoff_point: 'dropoff_point',
  agent: 'agent',
  metadata: 'metadata',
} as const;

export type WidgetGroupBy = (typeof WidgetGroupBy)[keyof typeof WidgetGroupBy];

export const GROUP_BY_DURATION_INTERVAL_MS = 60_000;

export const GROUP_BY_METADATA_PREFIX = 'metadata.';

export const GROUP_BY_AGENT_FIELD = 'agent.id';

export const SOURCE_GROUP_BYS: Record<DashboardSource, WidgetGroupBy[]> = {
  [DashboardSource.call_logs]: [
    WidgetGroupBy.none,
    WidgetGroupBy.success,
    WidgetGroupBy.is_reviewed,
    WidgetGroupBy.duration,
    WidgetGroupBy.call_ended_reason,
    WidgetGroupBy.topic,
    WidgetGroupBy.dropoff_point,
    WidgetGroupBy.agent,
    WidgetGroupBy.metadata,
  ],
  [DashboardSource.runs]: [
    WidgetGroupBy.none,
    WidgetGroupBy.success,
    WidgetGroupBy.is_reviewed,
    WidgetGroupBy.duration,
    WidgetGroupBy.call_ended_reason,
    WidgetGroupBy.agent,
    WidgetGroupBy.metadata,
  ],
};
