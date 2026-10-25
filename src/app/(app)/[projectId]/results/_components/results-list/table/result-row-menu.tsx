'use client';

import { EllipsisIcon, PencilIcon, Trash2Icon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { ResultListRow } from '@/server/results/types';

import { RenameResultDialog } from '../rename/rename-result-dialog';
import { DeleteResultDialog } from './delete-result-dialog';

interface ResultRowMenuProps {
  result: ResultListRow;
  onDeleted: (resultId: number) => void;
}

export function ResultRowMenu({ result, onDeleted }: ResultRowMenuProps) {
  const [renameOpen, setRenameOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="ghost"
              size="icon-xs"
              aria-label={`Actions for result ${result.id}`}
            />
          }
        >
          <EllipsisIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-36">
          <DropdownMenuItem
            className="text-xs"
            onClick={() => setRenameOpen(true)}
          >
            <PencilIcon />
            Rename
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            className="text-xs"
            onClick={() => setDeleteOpen(true)}
          >
            <Trash2Icon />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <RenameResultDialog
        open={renameOpen}
        onOpenChange={setRenameOpen}
        result={result}
      />
      <DeleteResultDialog
        resultId={result.id}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onDeleted={onDeleted}
      />
    </>
  );
}
