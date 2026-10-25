'use client';

import { PlusIcon } from 'lucide-react';
import type { UseFieldArrayReturn } from 'react-hook-form';

import { Button } from '@/components/ui/button';

import { EMPTY_VARIABLE } from '../../../_constants/variable-editor-mode';
import type { AddVariablesFormValues } from '../../../_schemas/add-variables-form-schema';
import { VariableFormRow } from './variable-form-row';

interface VariableRowsEditorProps {
  rows: UseFieldArrayReturn<AddVariablesFormValues, 'variables'>;
}

export function VariableRowsEditor({ rows }: VariableRowsEditorProps) {
  return (
    <div className="flex flex-col gap-2">
      {rows.fields.map((row, index) => (
        <VariableFormRow
          key={row.id}
          index={index}
          canRemove={rows.fields.length > 1}
          onRemove={() => rows.remove(index)}
        />
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={() => rows.append(EMPTY_VARIABLE)}
      >
        <PlusIcon />
        Add another variable
      </Button>
    </div>
  );
}
