'use client';

import { Controller } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';

import { useFeedbackForm } from '../../_hooks/forms/use-feedback-form';
import { useIsSavingFeedback } from '../../_hooks/mutations/call-review/use-is-saving-feedback';

interface FeedbackFormProps {
  callLogId: number;
  feedback: string | null;
  onSaved: () => void;
}

const FIELD_ID = 'call-feedback';

export function FeedbackForm({
  callLogId,
  feedback,
  onSaved,
}: FeedbackFormProps) {
  const { form, onSubmit } = useFeedbackForm(callLogId, feedback, onSaved);
  const isSaving = useIsSavingFeedback();

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-2">
      <Controller
        name="feedback"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="gap-1.5">
            <FieldLabel htmlFor={FIELD_ID} className="text-xs">
              Feedback
            </FieldLabel>
            <Textarea
              {...field}
              id={FIELD_ID}
              rows={4}
              placeholder="Add feedback for this call"
              className="text-xs md:text-xs"
            />
            <FieldError errors={[fieldState.error]} className="text-xs" />
          </Field>
        )}
      />
      <div className="flex justify-end">
        <Button type="submit" size="sm" disabled={isSaving}>
          Save
        </Button>
      </div>
    </form>
  );
}
