import 'server-only';

import type { MonitorFieldsInput } from '@/server/monitors/types';
import { computeNextRunAt } from '@/server/monitors/utils/compute-next-run-at';

export const monitorScalarData = (
  fields: MonitorFieldsInput,
  agentNumber: string | null,
) => ({
  name: fields.name,
  agentId: fields.agentId,
  cronExpression: fields.cronExpression,
  timezone: fields.timezone,
  frequency: fields.frequency,
  concurrencyLimit: fields.concurrencyLimit,
  callsPerSecond: fields.callsPerSecond,
  callerNumberMode: fields.callerNumberMode,
  agentNumber,
  nextRunAt: computeNextRunAt(fields.cronExpression, fields.timezone),
});

export const evaluatorLinks = (evaluatorIds: number[]) =>
  evaluatorIds.map((evaluatorId) => ({ evaluatorId }));

export const personalityLinks = (personalityIds: number[]) =>
  personalityIds.map((personalityId) => ({ personalityId }));
