'use client';

import { DatabaseIcon, Trash2Icon } from 'lucide-react';
import { useState } from 'react';

import { DeleteConfirmDialog } from '@/components/common/delete-confirm-dialog/delete-confirm-dialog';
import { Button } from '@/components/ui/button';
import { KnowledgeConnectorTypeLabel } from '@/server/agents/constants/knowledge-connector-type-labels';
import type { KnowledgeConnectorItem } from '@/server/agents/types';

import { useDeleteKnowledgeConnectorMutation } from '../../../_hooks/mutations/knowledge/use-delete-knowledge-connector-mutation';
import { connectorSyncText } from '../../../_utils/connector-sync-text';

type ConnectorRowProps = {
  connector: KnowledgeConnectorItem;
};

export function ConnectorRow({ connector }: ConnectorRowProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const deleteConnector = useDeleteKnowledgeConnectorMutation();

  return (
    <li className="flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-xs">
      <DatabaseIcon className="size-4 shrink-0 text-muted-foreground" />
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate font-medium">{connector.name}</span>
        <span className="truncate text-muted-foreground">
          {KnowledgeConnectorTypeLabel[connector.type]} ·{' '}
          {connectorSyncText(connector)}
        </span>
      </div>
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        aria-label={`Delete ${connector.name}`}
        className="text-destructive"
        onClick={() => setConfirmOpen(true)}
      >
        <Trash2Icon />
      </Button>
      <DeleteConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        isPending={deleteConnector.isPending}
        description="This action cannot be undone. This will permanently delete the connector."
        onConfirm={() =>
          deleteConnector.mutate(
            { knowledgeConnectorId: connector.id },
            {
              onSuccess: (result) => {
                if (!result.ok) return;
                setConfirmOpen(false);
              },
            },
          )
        }
      />
    </li>
  );
}
