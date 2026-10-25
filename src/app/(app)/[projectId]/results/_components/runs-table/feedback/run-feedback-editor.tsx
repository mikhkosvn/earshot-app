'use client';

import { Controller } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Field, FieldError } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

import { useIsSavingRunFeedback } from '../../../_hooks/mutations/runs/use-is-saving-run-feedback';
import { useRunFeedbackForm } from '../../../_hooks/runs/use-run-feedback-form';

interface RunFeedbackEditorProps {
  runId: number;
  feedback: string | null;
  onClose: () => void;
  className?: string;
}

export function RunFeedbackEditor({
  runId,
  feedback,
  onClose,
  className,
}: RunFeedbackEditorProps) {
  const { form, onSubmit } = useRunFeedbackForm({
    runId,
    feedback,
    onSaved: onClose,
  });
  const isSaving = useIsSavingRunFeedback();

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={cn('flex flex-col gap-2', className)}
    >
      <Controller
        name="feedback"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="gap-1">
            <Textarea
              {...field}
              autoFocus
              rows={3}
              aria-label="Feedback"
              placeholder="Add feedback for this run"
              className="min-h-16 text-xs md:text-xs"
            />
            <FieldError errors={[fieldState.error]} className="text-xs" />
          </Field>
        )}
      />
      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          size="xs"
          disabled={isSaving}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button type="submit" size="xs" disabled={isSaving}>
          Save
        </Button>
      </div>
    </form>
  );
}
