'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { LAST_QUICK_RANGES } from '@/lib/time-range/constants';
import { SAVE_DEFAULT_RANGE_LABEL } from '@/server/runs-overview/constants';

import {
  saveConfigurationFormSchema,
  type SaveConfigurationFormValues,
} from '../../_schemas/save-configuration-form-schema';
import { useCreateConfigurationMutation } from '../mutations/use-create-configuration-mutation';
import { useOverviewFilters } from '../use-overview-filters';
import { useRunsOverviewParams } from '../use-runs-overview-params';

export const useSaveConfigurationForm = (onDone: () => void) => {
  const projectId = useCurrentProjectId();
  const filters = useOverviewFilters();
  const [{ hidden }] = useRunsOverviewParams();
  const form = useForm<SaveConfigurationFormValues>({
    resolver: zodResolver(saveConfigurationFormSchema),
    defaultValues: {
      name: '',
      range: SAVE_DEFAULT_RANGE_LABEL,
      includeMetricVisibility: true,
    },
  });
  const createConfiguration = useCreateConfigurationMutation();

  const onSubmit = form.handleSubmit((values) => {
    const range = LAST_QUICK_RANGES.find((item) => item.label === values.range);
    if (!range) return;
    createConfiguration.mutate(
      {
        projectId,
        name: values.name,
        rangeFrom: range.from,
        rangeTo: range.to,
        filters,
        includeMetricVisibility: values.includeMetricVisibility,
        hiddenMetricIds: hidden,
      },
      {
        onSuccess: (result) => {
          if (!result.ok) return;
          onDone();
        },
      },
    );
  });

  return { form, onSubmit, isPending: createConfiguration.isPending };
};
