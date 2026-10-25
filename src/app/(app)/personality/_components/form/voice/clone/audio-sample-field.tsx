'use client';

import { UploadIcon } from 'lucide-react';
import { useRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { CLONE_SAMPLE_EXTENSIONS } from '@/server/voices/constants/elevenlabs-voices';
import type { CloneVoiceFormValues } from '@/server/voices/types';

import { AudioSampleName } from './audio-sample-name';

export function AudioSampleField() {
  const { control } = useFormContext<CloneVoiceFormValues>();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Controller
      name="sample"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-1.5">
          <FieldLabel>Audio sample</FieldLabel>
          <div
            className="flex flex-col items-center gap-2 rounded-lg border-2 border-dashed p-5 text-center text-xs text-muted-foreground"
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              event.preventDefault();
              field.onChange(event.dataTransfer.files[0] ?? null);
            }}
          >
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              aria-label="Choose an audio file"
              onClick={() => inputRef.current?.click()}
            >
              <UploadIcon />
            </Button>
            <p className="font-medium text-foreground">
              Drag and drop, or choose an audio file
            </p>
            <p>wav, mp3, m4a, ogg, webm, flac. Up to 25MB.</p>
            <AudioSampleName file={field.value} />
            <Input
              ref={inputRef}
              type="file"
              accept={CLONE_SAMPLE_EXTENSIONS.join(',')}
              aria-label="Audio sample"
              className="hidden"
              onChange={(event) =>
                field.onChange(event.target.files?.[0] ?? null)
              }
            />
          </div>
          <FieldError errors={[fieldState.error]} />
        </Field>
      )}
    />
  );
}
