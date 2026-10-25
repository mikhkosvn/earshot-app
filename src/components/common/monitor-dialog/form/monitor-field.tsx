import type { ReactNode } from 'react';
import type { FieldError as FormFieldError } from 'react-hook-form';

import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { cn } from '@/lib/utils';

import { MonitorFieldText } from './monitor-field-text';

interface MonitorFieldProps {
  id?: string;
  label: ReactNode;
  description?: ReactNode;
  help?: ReactNode;
  error?: FormFieldError;
  className?: string;
  children: ReactNode;
}

export function MonitorField({
  id,
  label,
  description,
  help,
  error,
  className,
  children,
}: MonitorFieldProps) {
  return (
    <Field data-invalid={Boolean(error)} className={cn('gap-1.5', className)}>
      <div className="flex flex-col gap-0.5">
        <FieldLabel htmlFor={id} className="gap-1 text-xs font-medium">
          {label}
        </FieldLabel>
        <MonitorFieldText>{description}</MonitorFieldText>
      </div>
      {children}
      <MonitorFieldText>{help}</MonitorFieldText>
      <FieldError errors={[error]} className="text-xs" />
    </Field>
  );
}
