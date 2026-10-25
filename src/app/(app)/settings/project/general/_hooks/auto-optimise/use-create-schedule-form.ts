'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { DEFAULT_SCHEDULE_CRON } from '@/server/metric-optimizer/constants/optimizer-limits';
import { optimizerScheduleFieldsSchema } from '@/server/metric-optimizer/schemas';
import type { OptimizerScheduleFields } from '@/server/metric-optimizer/types';

import { useCreateScheduleMutation } from '../mutations/auto-optimise/use-create-schedule-mutation';

export const useCreateScheduleForm = (onSaved: () => void) => {
  const projectId = useCurrentProjectId();
  const form = useForm<OptimizerScheduleFields>({
    resolver: zodResolver(optimizerScheduleFieldsSchema),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      cronExpression: DEFAULT_SCHEDULE_CRON,
      isActive: true,
    },
  });
  const createSchedule = useCreateScheduleMutation();

  const onSubmit = form.handleSubmit((values) =>
    createSchedule.mutate(
      { projectId, ...values },
      {
        onSuccess: (result) => {
          if (!result.ok) return;
          onSaved();
        },
      },
    ),
  );

  return { form, onSubmit, isSaving: createSchedule.isPending };
};
