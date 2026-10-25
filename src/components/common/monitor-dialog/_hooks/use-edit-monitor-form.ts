'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import {
  type MonitorFormOutput,
  monitorFormSchema,
  type MonitorFormValues,
} from '../_schemas/monitor-form-schema';
import { MonitorService } from '../_service';
import { editMonitorDefaults } from '../_utils/form/monitor-form-defaults';
import { toMonitorFields } from '../_utils/form/to-monitor-fields';
import { useUpdateMonitorMutation } from './mutations/use-update-monitor-mutation';
import { useMonitorAgents } from './use-monitor-agents';

export const useEditMonitorForm = (monitorId: number, onSaved: () => void) => {
  const agents = useMonitorAgents();
  const { data: detail } = useSuspenseQuery(
    MonitorService.getMonitorQuery({ monitorId }),
  );
  const form = useForm<MonitorFormValues, unknown, MonitorFormOutput>({
    resolver: zodResolver(monitorFormSchema),
    defaultValues: editMonitorDefaults(detail, agents),
  });
  const updateMonitor = useUpdateMonitorMutation();

  const onSubmit = form.handleSubmit((values) => {
    const fields = toMonitorFields(values);
    if (!fields) return;
    updateMonitor.mutate(
      { monitorId, ...fields },
      {
        onSuccess: (result) => {
          if (!result.ok) return;
          onSaved();
        },
      },
    );
  });

  return { form, onSubmit };
};
