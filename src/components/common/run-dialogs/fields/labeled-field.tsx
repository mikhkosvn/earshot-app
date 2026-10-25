import type { ReactNode } from 'react';
import type { FieldError as FormFieldError } from 'react-hook-form';

import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { cn } from '@/lib/utils';

import { FieldHelp } from './field-help';

interface LabeledFieldProps {
  id: string;
  label: ReactNode;
  description?: ReactNode;
  error?: FormFieldError;
  className?: string;
  children: ReactNode;
}

export function LabeledField({
  id,
  label,
  description,
  error,
  className,
  children,
}: LabeledFieldProps) {
  return (
    <Field data-invalid={Boolean(error)} className={cn('gap-1.5', className)}>
      <div className="flex flex-col gap-0.5">
        <FieldLabel htmlFor={id}>{label}</FieldLabel>
        <FieldHelp>{description}</FieldHelp>
      </div>
      {children}
      <FieldError errors={[error]} />
    </Field>
  );
}
