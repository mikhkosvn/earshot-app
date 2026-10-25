import 'server-only';

import type { Prisma } from '@/generated/prisma/client';
import { ChangeDirection } from '@/generated/prisma/enums';
import type { AlertRow } from '@/server/alerts/types';
import { parseAlertFilters } from '@/server/alerts/utils/alert-filters';

export const alertRowSelect = {
  id: true,
  name: true,
  enabled: true,
  type: true,
  direction: true,
  filters: true,
  thresholdOperator: true,
  thresholdValue: true,
  thresholdUpperValue: true,
  minBreaches: true,
  windowSize: true,
  stdMultiplier: true,
  ewmaAlpha: true,
  minCalls: true,
  minCount: true,
  multiplier: true,
  windowHours: true,
  baselineHours: true,
  createdAt: true,
  metric: {
    select: {
      id: true,
      name: true,
      evalType: true,
      agents: { select: { agentId: true } },
    },
  },
} satisfies Prisma.AlertRuleSelect;

type AlertRowRecord = Prisma.AlertRuleGetPayload<{
  select: typeof alertRowSelect;
}>;

export const toAlertRow = ({
  metric,
  filters,
  direction,
  ...rule
}: AlertRowRecord): AlertRow => ({
  ...rule,
  direction: direction ?? ChangeDirection.both,
  filters: parseAlertFilters(filters),
  metric: {
    id: metric.id,
    name: metric.name,
    evalType: metric.evalType,
    agentIds: metric.agents.map((agent) => agent.agentId),
  },
});
