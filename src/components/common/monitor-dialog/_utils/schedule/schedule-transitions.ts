import { CallerNumberMode } from '@/generated/prisma/enums';
import type { MonitorAgentOption } from '@/server/monitors/types';

import {
  SCHEDULE_MODE_CRON,
  ScheduleMode,
} from '../../_constants/schedule-mode';
import type { MonitorForm } from '../../_schemas/monitor-form-schema';
import { refreshAutoName } from '../form/monitor-name';

const validateOption = (form: MonitorForm) => ({
  shouldDirty: true,
  shouldValidate: form.formState.isSubmitted,
});

export const changeScheduleMode = (
  form: MonitorForm,
  mode: ScheduleMode,
  agents: MonitorAgentOption[],
) => {
  form.setValue('scheduleMode', mode, { shouldDirty: true });
  if (mode !== ScheduleMode.custom) {
    form.setValue('cronExpression', SCHEDULE_MODE_CRON[mode], {
      ...validateOption(form),
    });
  }
  refreshAutoName(form, agents);
};

export const changeCronExpression = (form: MonitorForm, expression: string) => {
  form.setValue('cronExpression', expression, validateOption(form));
};

export const changeMonitorAgent = (
  form: MonitorForm,
  agent: MonitorAgentOption,
  agents: MonitorAgentOption[],
) => {
  form.setValue('agentId', agent.id, validateOption(form));
  form.setValue('agentNumber', agent.phoneNumber ?? '');
  form.setValue('callerNumberMode', CallerNumberMode.same_number);
  refreshAutoName(form, agents);
};
