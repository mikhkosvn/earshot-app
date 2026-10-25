'use client';

import { PlusIcon, Trash2Icon } from 'lucide-react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import type { VariableListName } from '../../../../_constants/variable-editor-mode';
import type { TestProfileFormValues } from '../../../../_schemas/test-profile-form-schema';

type VariableTableEditorProps = {
  name: VariableListName;
};

export function VariableTableEditor({ name }: VariableTableEditorProps) {
  const { control, register } = useFormContext<TestProfileFormValues>();
  const { fields, append, remove } = useFieldArray({ control, name });

  return (
    <div className="flex flex-col gap-2">
      {fields.map((field, index) => (
        <div key={field.id} className="flex items-center gap-2">
          <Input
            {...register(`${name}.${index}.key`)}
            placeholder="Key"
            aria-label="Variable key"
          />
          <Input
            {...register(`${name}.${index}.value`)}
            placeholder="Value"
            aria-label="Variable value"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Remove variable"
            onClick={() => remove(index)}
          >
            <Trash2Icon />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="w-fit"
        onClick={() => append({ key: '', value: '' })}
      >
        <PlusIcon />
        Add variable
      </Button>
    </div>
  );
}
