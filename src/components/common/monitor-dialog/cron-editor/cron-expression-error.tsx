'use client';

import { useFormState } from 'react-hook-form';

import { FieldError } from '@/components/ui/field';

import { useMonitorFormContext } from '../_hooks/use-monitor-form-context';

export function CronExpressionError() {
  const { control } = useMonitorFormContext();
  const { errors } = useFormState({ control, name: 'cronExpression' });

  return <FieldError errors={[errors.cronExpression]} className="text-xs" />;
}
