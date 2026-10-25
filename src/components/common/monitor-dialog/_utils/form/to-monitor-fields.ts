import type { MonitorFieldsInput } from '@/server/monitors/types';

import type { MonitorFormOutput } from '../../_schemas/monitor-form-schema';

export const toMonitorFields = (
  values: MonitorFormOutput,
): MonitorFieldsInput | null => {
  if (values.agentId === null) return null;
  return {
    name: values.name,
    agentId: values.agentId,
    executionMode: values.executionMode,
    evaluatorIds: values.evaluatorIds,
    personalityIds: values.personalityIds,
    cronExpression: values.cronExpression,
    timezone: values.timezone,
    frequency: values.frequency,
    concurrencyLimit: values.concurrencyLimit,
    callsPerSecond: values.callsPerSecond,
    callerNumberMode: values.callerNumberMode,
    agentNumber: values.agentNumber,
  };
};
