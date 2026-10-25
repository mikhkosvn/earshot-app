'use client';

import { PencilLineIcon } from 'lucide-react';
import { useState } from 'react';
import { useFormState } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import type { LabRowView } from '@/server/labs/types';

import type { LabMetricFormInput } from '../../../_schemas/lab-metric-form-schema';
import { valueText } from '../../../_utils/value-text';
import { ExpectedValueDialog } from '../dialogs/expected-value-dialog';

interface ExpectedValueCellProps {
  row: LabRowView;
}

export function ExpectedValueCell({ row }: ExpectedValueCellProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { disabled } = useFormState<LabMetricFormInput>();

  return (
    <div className="flex w-32 flex-col items-center gap-2">
      <span className="text-sm">{valueText(row.expected)}</span>
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={disabled}
        onClick={() => setIsOpen(true)}
      >
        <PencilLineIcon />
        Edit
      </Button>
      <ExpectedValueDialog row={row} open={isOpen} onOpenChange={setIsOpen} />
    </div>
  );
}
