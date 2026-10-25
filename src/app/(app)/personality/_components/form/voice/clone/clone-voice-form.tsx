'use client';

import { UploadIcon } from 'lucide-react';
import { Controller, FormProvider } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import { useCloneVoiceForm } from '../../../../_hooks/form/use-clone-voice-form';
import { AudioSampleField } from './audio-sample-field';

interface CloneVoiceFormProps {
  onCloned: (voiceId: string) => void;
}

export function CloneVoiceForm({ onCloned }: CloneVoiceFormProps) {
  const { form, onSubmit, isPending } = useCloneVoiceForm(onCloned);

  return (
    <FormProvider {...form}>
      <form
        noValidate
        className="flex flex-col gap-4"
        onSubmit={(event) => {
          event.stopPropagation();
          void onSubmit(event);
        }}
      >
        <AudioSampleField />
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1.5">
              <FieldLabel htmlFor="clone-voice-name">Voice name</FieldLabel>
              <Input
                {...field}
                id="clone-voice-name"
                placeholder="e.g. Frustrated caller"
                aria-invalid={fieldState.invalid}
              />
              <FieldDescription className="text-xs">
                Shown in your voice list, so name it something you will
                recognise later.
              </FieldDescription>
              <FieldError errors={[fieldState.error]} />
            </Field>
          )}
        />
        <DialogFooter>
          <DialogClose render={<Button type="button" variant="outline" />}>
            Cancel
          </DialogClose>
          <Button type="submit" disabled={isPending}>
            <UploadIcon />
            Clone voice
          </Button>
        </DialogFooter>
      </form>
    </FormProvider>
  );
}
