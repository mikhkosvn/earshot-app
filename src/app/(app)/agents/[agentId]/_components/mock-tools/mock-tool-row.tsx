'use client';

import {
  ChevronRightIcon,
  PencilIcon,
  Trash2Icon,
  WrenchIcon,
} from 'lucide-react';
import { useState } from 'react';

import { DeleteConfirmDialog } from '@/components/common/delete-confirm-dialog/delete-confirm-dialog';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import type { MockToolItem } from '@/server/agents/types';

import { useDeleteMockToolMutation } from '../../_hooks/mutations/mock-tools/use-delete-mock-tool-mutation';
import { FailureBadge } from './failure-badge';
import { MockToolDialog } from './mock-tool-dialog';

interface MockToolRowProps {
  tool: MockToolItem;
}

export function MockToolRow({ tool }: MockToolRowProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const deleteTool = useDeleteMockToolMutation();

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
                aria-label={`Show mappings of ${tool.name}`}
                className="data-panel-open:rotate-90"
              />
            }
          >
            <ChevronRightIcon />
          </CollapsibleTrigger>
          <WrenchIcon className="size-3.5 shrink-0 text-muted-foreground" />
          <span className="min-w-0 truncate font-medium">{tool.name}</span>
          <span className="shrink-0 text-muted-foreground">
            ({tool.mappings.length} mappings)
          </span>
          <FailureBadge count={tool.failureCount} />
          <span className="flex-1" />
          <Button
            type="button"
            variant="outline"
            size="icon-xs"
            aria-label={`Edit ${tool.name}`}
            onClick={() => setEditOpen(true)}
          >
            <PencilIcon />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon-xs"
            aria-label={`Delete ${tool.name}`}
            className="text-destructive"
            onClick={() => setDeleteOpen(true)}
          >
            <Trash2Icon />
          </Button>
        </div>
        <CollapsibleContent className="border-t p-2">
          <pre className="max-h-60 overflow-auto rounded-sm bg-muted p-2 font-mono text-[11px]">
            {JSON.stringify(tool.mappings, null, 2)}
          </pre>
        </CollapsibleContent>
      </Collapsible>
      <MockToolDialog tool={tool} open={editOpen} onOpenChange={setEditOpen} />
      <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        isPending={deleteTool.isPending}
        description="This action cannot be undone. This will permanently delete the mock tool."
        onConfirm={() =>
          deleteTool.mutate(
            { mockToolId: tool.id },
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
