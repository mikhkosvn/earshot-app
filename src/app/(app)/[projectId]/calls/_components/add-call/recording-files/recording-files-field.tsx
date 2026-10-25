'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { Field, FieldError } from '@/components/ui/field';
import type { UploadCallLogsInput } from '@/server/call-logs/types';

import { RecordingDropZone } from './recording-drop-zone';
import { RecordingFileList } from './recording-file-list';

export function RecordingFilesField() {
  const { control } = useFormContext<UploadCallLogsInput>();

  return (
    <Controller
      name="files"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-2">
          <RecordingDropZone
            onAdd={(files) => field.onChange([...field.value, ...files])}
          />
          <RecordingFileList
            files={field.value}
            onRemove={(index) =>
              field.onChange(
                field.value.filter((_, position) => position !== index),
              )
            }
          />
          <FieldError errors={[fieldState.error]} className="text-xs" />
        </Field>
      )}
    />
  );
}
