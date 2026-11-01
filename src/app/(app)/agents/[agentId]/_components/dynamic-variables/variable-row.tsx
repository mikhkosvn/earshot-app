'use client';

import { BracesIcon, PencilIcon, Trash2Icon } from 'lucide-react';
import { useState } from 'react';

import { DeleteConfirmDialog } from '@/components/common/delete-confirm-dialog/delete-confirm-dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import type { DynamicVariableItem } from '@/server/agents/types';

import { useDeleteDynamicVariableMutation } from '../../_hooks/mutations/dynamic-variables/use-delete-dynamic-variable-mutation';
import { EditVariableDialog } from './edit-variable/edit-variable-dialog';

const VARIABLE_ITEM_VALUE = 'variable';

interface VariableRowProps {
  variable: DynamicVariableItem;
}

export function VariableRow({ variable }: VariableRowProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const deleteVariable = useDeleteDynamicVariableMutation();

  return (
    <li className="rounded-lg border">
      <Accordion>
        <AccordionItem value={VARIABLE_ITEM_VALUE}>
          <div className="grid grid-cols-[1fr_auto_auto] items-center gap-2 px-2 py-1.5 text-xs">
            <AccordionTrigger className="min-w-0 items-center gap-2 py-0 text-xs font-normal hover:no-underline">
              <BracesIcon className="size-3.5 shrink-0 text-muted-foreground" />
              <span className="min-w-0 flex-1 truncate font-medium">
                {variable.name}
              </span>
            </AccordionTrigger>
            <Button
              type="button"
              variant="outline"
              size="icon-xs"
              aria-label={`Edit ${variable.name}`}
              onClick={() => setEditOpen(true)}
            >
              <PencilIcon />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon-xs"
              aria-label={`Delete ${variable.name}`}
              className="text-destructive"
              onClick={() => setDeleteOpen(true)}
            >
              <Trash2Icon />
            </Button>
          </div>
          <AccordionContent className="border-t px-3 py-2 text-xs text-muted-foreground">
            {variable.description}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <EditVariableDialog
        variable={variable}
        open={editOpen}
        onOpenChange={setEditOpen}
      />
      <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        isPending={deleteVariable.isPending}
        description="This action cannot be undone. This will permanently delete the variable."
        onConfirm={() =>
          deleteVariable.mutate(
            { dynamicVariableId: variable.id },
            {
              onSuccess: (result) => {
                if (!result.ok) return;
                setDeleteOpen(false);
              },
            },
          )
        }
      />
    </li>
  );
}
