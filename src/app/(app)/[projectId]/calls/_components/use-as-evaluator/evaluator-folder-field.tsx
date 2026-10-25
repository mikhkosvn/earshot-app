'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { FolderIcon } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import type { UseAsEvaluatorFormValues } from '../../_schemas/use-as-evaluator-form-schema';
import { CallService } from '../../_service';

const FIELD_ID = 'evaluator-folder';

const selectedValue = (path: string) => {
  if (path) return path;
  return null;
};

export function EvaluatorFolderField() {
  const projectId = useCurrentProjectId();
  const { control } = useFormContext<UseAsEvaluatorFormValues>();
  const { data: items } = useSuspenseQuery({
    ...CallService.getFoldersQuery({ projectId }),
    select: (folders) =>
      folders.map((folder) => ({ value: folder.path, label: folder.path })),
  });

  return (
    <Controller
      name="folderPath"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-1.5">
          <div className="flex flex-col gap-0.5">
            <FieldLabel htmlFor={FIELD_ID} className="text-xs">
              Folder
            </FieldLabel>
            <FieldDescription className="text-xs">
              Select the folder to save simulation as evaluator *
            </FieldDescription>
          </div>
          <Select
            items={items}
            value={selectedValue(field.value)}
            onValueChange={(value) => {
              if (value === null) return;
              field.onChange(value);
            }}
          >
            <SelectTrigger id={FIELD_ID} className="w-full text-xs">
              <FolderIcon className="text-muted-foreground" />
              <SelectValue placeholder="Select folder" />
            </SelectTrigger>
            <SelectContent>
              {items.map((item) => (
                <SelectItem
                  key={item.value}
                  value={item.value}
                  className="text-xs"
                >
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError errors={[fieldState.error]} className="text-xs" />
        </Field>
      )}
    />
  );
}
