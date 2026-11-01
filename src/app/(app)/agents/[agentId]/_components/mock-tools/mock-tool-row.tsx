'use client';

import { PencilIcon, Trash2Icon, WrenchIcon } from 'lucide-react';
import { useState } from 'react';

import { DeleteConfirmDialog } from '@/components/common/delete-confirm-dialog/delete-confirm-dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import type { MockToolItem } from '@/server/agents/types';

import { useDeleteMockToolMutation } from '../../_hooks/mutations/mock-tools/use-delete-mock-tool-mutation';
import { FailureBadge } from './failure-badge';
import { MockToolDialog } from './mock-tool-dialog';

const MOCK_TOOL_ITEM_VALUE = 'mock-tool';

interface MockToolRowProps {
  tool: MockToolItem;
}

export function MockToolRow({ tool }: MockToolRowProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const deleteTool = useDeleteMockToolMutation();

  return (
    <li className="rounded-lg border">
      <Accordion>
        <AccordionItem value={MOCK_TOOL_ITEM_VALUE}>
          <div className="grid grid-cols-[1fr_auto_auto] items-center gap-2 px-2 py-1.5 text-xs">
            <AccordionTrigger className="min-w-0 items-center gap-2 py-0 text-xs font-normal hover:no-underline">
              <WrenchIcon className="size-3.5 shrink-0 text-muted-foreground" />
              <span className="min-w-0 truncate font-medium">{tool.name}</span>
              <span className="shrink-0 text-muted-foreground">
                ({tool.mappings.length} mappings)
              </span>
              <FailureBadge count={tool.failureCount} />
            </AccordionTrigger>
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
          <AccordionContent className="border-t p-2">
            <pre className="max-h-60 overflow-auto rounded-sm bg-muted p-2 font-mono text-[11px]">
              {JSON.stringify(tool.mappings, null, 2)}
            </pre>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
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
