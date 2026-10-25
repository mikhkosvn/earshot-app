'use client';

import { PencilLineIcon } from 'lucide-react';
import { useState } from 'react';
import { useFormState } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import type { LabRowView } from '@/server/labs/types';

import type { LabMetricFormInput } from '../../../_schemas/lab-metric-form-schema';
import { NotesDialog } from '../dialogs/notes-dialog';

interface NotesCellProps {
  row: LabRowView;
}

export function NotesCell({ row }: NotesCellProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { disabled } = useFormState<LabMetricFormInput>();

  return (
    <div className="flex w-48 flex-col items-start gap-2">
      <p className="line-clamp-4 text-sm whitespace-pre-line">
        {row.feedback ?? '-'}
      </p>
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
      <NotesDialog row={row} open={isOpen} onOpenChange={setIsOpen} />
    </div>
  );
}
