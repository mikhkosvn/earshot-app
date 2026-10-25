'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { optimizerScheduleFieldsSchema } from '@/server/metric-optimizer/schemas';
import type {
  OptimizerScheduleFields,
  OptimizerScheduleView,
} from '@/server/metric-optimizer/types';

import { useUpdateScheduleMutation } from '../mutations/auto-optimise/use-update-schedule-mutation';

export const useEditScheduleForm = (
  schedule: OptimizerScheduleView,
  onSaved: () => void,
) => {
  const form = useForm<OptimizerScheduleFields>({
    resolver: zodResolver(optimizerScheduleFieldsSchema),
    mode: 'onTouched',
    defaultValues: {
      name: schedule.name,
      cronExpression: schedule.cronExpression,
      isActive: schedule.isActive,
    },
  });
  const updateSchedule = useUpdateScheduleMutation();

  const onSubmit = form.handleSubmit((values) =>
    updateSchedule.mutate(
      { scheduleId: schedule.id, ...values },
      {
        onSuccess: (result) => {
          if (!result.ok) return;
          onSaved();
        },
      },
    ),
  );

  return { form, onSubmit, isSaving: updateSchedule.isPending };
};
