'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';

import {
  type MonitorFormOutput,
  monitorFormSchema,
  type MonitorFormValues,
} from '../_schemas/monitor-form-schema';
import {
  type CreateMonitorPrefill,
  createMonitorDefaults,
} from '../_utils/form/monitor-form-defaults';
import { toMonitorFields } from '../_utils/form/to-monitor-fields';
import { useCreateMonitorMutation } from './mutations/use-create-monitor-mutation';
import { useMonitorAgents } from './use-monitor-agents';
import { useMonitorScenarios } from './use-monitor-scenarios';

export const useCreateMonitorForm = (
  prefill: CreateMonitorPrefill,
  onCreated: () => void,
) => {
  const projectId = useCurrentProjectId();
  const agents = useMonitorAgents();
  const tree = useMonitorScenarios();
  const form = useForm<MonitorFormValues, unknown, MonitorFormOutput>({
    resolver: zodResolver(monitorFormSchema),
    defaultValues: createMonitorDefaults(prefill, agents, tree),
  });
  const createMonitor = useCreateMonitorMutation();

  const onSubmit = form.handleSubmit((values) => {
    const fields = toMonitorFields(values);
    if (!fields) return;
    createMonitor.mutate(
      { projectId, ...fields },
      {
        onSuccess: (result) => {
          if (!result.ok) return;
          onCreated();
        },
      },
    );
  });

  return { form, onSubmit };
};
