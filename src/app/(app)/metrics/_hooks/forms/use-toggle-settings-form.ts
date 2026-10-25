'use client';

import { useForm } from 'react-hook-form';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';

import { FlagChange } from '../../_constants/flag-change';
import type { MetricFlag } from '../../_constants/metric-flag';
import { flagChangeValue } from '../../_utils/flag-change-value';
import { useBulkUpdateMetricFlagsMutation } from '../mutations/bulk/use-bulk-update-metric-flags-mutation';

export type ToggleSettingsValues = Record<MetricFlag, FlagChange>;

export const useToggleSettingsForm = (
  metricIds: number[],
  onSaved: () => void,
) => {
  const projectId = useCurrentProjectId();
  const form = useForm<ToggleSettingsValues>({
    defaultValues: {
      observabilityEnabled: FlagChange.noChange,
      simulationEnabled: FlagChange.noChange,
      samplingEnabled: FlagChange.noChange,
    },
  });
  const bulkUpdate = useBulkUpdateMetricFlagsMutation();

  const onSubmit = form.handleSubmit((values) =>
    bulkUpdate.mutate(
      {
        projectId,
        metricIds,
        observabilityEnabled: flagChangeValue(values.observabilityEnabled),
        simulationEnabled: flagChangeValue(values.simulationEnabled),
        samplingEnabled: flagChangeValue(values.samplingEnabled),
      },
      {
        onSuccess: (result) => {
          if (!result.ok) return;
          onSaved();
        },
      },
    ),
  );

  return { form, onSubmit };
};
