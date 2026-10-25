import type { ReactNode } from 'react';
import type { FieldError as FormFieldError } from 'react-hook-form';

import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { cn } from '@/lib/utils';

import { FieldHelp } from './field-help';
import { RequiredMark } from './required-mark';

type LabeledFieldProps = {
  id: string;
  label: string;
  description?: ReactNode;
  required?: boolean;
  error?: FormFieldError;
  action?: ReactNode;
  className?: string;
  children: ReactNode;
};

export function LabeledField({
  id,
  label,
  description,
  required,
  error,
  action,
  className,
  children,
}: LabeledFieldProps) {
  return (
    <Field data-invalid={Boolean(error)} className={cn('gap-1.5', className)}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-0.5">
          <FieldLabel htmlFor={id}>
            {label}
            <RequiredMark required={required} />
          </FieldLabel>
          <FieldHelp>{description}</FieldHelp>
        </div>
        {action}
      </div>
      {children}
      <FieldError errors={[error]} />
    </Field>
  );
}
