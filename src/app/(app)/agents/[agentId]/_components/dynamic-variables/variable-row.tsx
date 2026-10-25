'use client';

import {
  BracesIcon,
  ChevronRightIcon,
  PencilIcon,
  Trash2Icon,
} from 'lucide-react';
import { useState } from 'react';

import { DeleteConfirmDialog } from '@/components/common/delete-confirm-dialog/delete-confirm-dialog';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import type { DynamicVariableItem } from '@/server/agents/types';

import { useDeleteDynamicVariableMutation } from '../../_hooks/mutations/dynamic-variables/use-delete-dynamic-variable-mutation';
import { EditVariableDialog } from './edit-variable/edit-variable-dialog';

interface VariableRowProps {
  variable: DynamicVariableItem;
}

export function VariableRow({ variable }: VariableRowProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const deleteVariable = useDeleteDynamicVariableMutation();

  return (
    <li className="rounded-lg border">
      <Collapsible>
        <div className="flex items-center gap-2 px-2 py-1.5 text-xs">
          <CollapsibleTrigger
            render={
              <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                aria-label={`Show description of ${variable.name}`}
                className="data-panel-open:rotate-90"
              />
            }
          >
            <ChevronRightIcon />
          </CollapsibleTrigger>
          <BracesIcon className="size-3.5 shrink-0 text-muted-foreground" />
          <span className="min-w-0 flex-1 truncate font-medium">
            {variable.name}
          </span>
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
        <CollapsibleContent className="border-t px-3 py-2 text-xs text-muted-foreground">
          {variable.description}
        </CollapsibleContent>
      </Collapsible>
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
