import type { MonitorAgentOption } from '@/server/monitors/types';

import { ScheduleModeCadence } from '../../_constants/schedule-mode';
import type { MonitorForm } from '../../_schemas/monitor-form-schema';

export const findAgent = (
  agents: MonitorAgentOption[],
  agentId: number | null,
) => agents.find((agent) => agent.id === agentId) ?? null;

export const refreshAutoName = (
  form: MonitorForm,
  agents: MonitorAgentOption[],
) => {
  const { autoName, agentId, scheduleMode } = form.getValues();
  if (!autoName) return;
  const agent = findAgent(agents, agentId);
  if (!agent) return;
  form.setValue(
    'name',
    `${agent.name} - ${ScheduleModeCadence[scheduleMode]}`,
    {
      shouldValidate: form.formState.isSubmitted,
    },
  );
};

export const changeMonitorName = (form: MonitorForm, name: string) => {
  form.setValue('autoName', false);
  form.setValue('name', name, {
    shouldDirty: true,
    shouldValidate: form.formState.isSubmitted,
  });
};
