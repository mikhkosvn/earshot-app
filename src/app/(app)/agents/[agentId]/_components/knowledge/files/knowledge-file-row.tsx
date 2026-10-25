'use client';

import { FileTextIcon, Trash2Icon } from 'lucide-react';
import { useState } from 'react';

import { DeleteConfirmDialog } from '@/components/common/delete-confirm-dialog/delete-confirm-dialog';
import { Button } from '@/components/ui/button';
import { UrlGenerator } from '@/lib/url-generator/url-generator';
import type { KnowledgeFileItem } from '@/server/agents/types';

import { useDeleteKnowledgeFileMutation } from '../../../_hooks/mutations/knowledge/use-delete-knowledge-file-mutation';
import { formatBytes } from '../../../_utils/format-bytes';

type KnowledgeFileRowProps = {
  file: KnowledgeFileItem;
};

export function KnowledgeFileRow({ file }: KnowledgeFileRowProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const deleteFile = useDeleteKnowledgeFileMutation();

  return (
    <li className="flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-xs">
      <FileTextIcon className="size-4 shrink-0 text-muted-foreground" />
      <a
        href={UrlGenerator.file({ fileId: file.fileId })}
        target="_blank"
        rel="noreferrer"
        className="min-w-0 flex-1 truncate hover:underline"
      >
        {file.fileName}
      </a>
      <span className="text-muted-foreground">
        {formatBytes(file.sizeBytes)}
      </span>
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        aria-label={`Delete ${file.fileName}`}
        className="text-destructive"
        onClick={() => setConfirmOpen(true)}
      >
        <Trash2Icon />
      </Button>
      <DeleteConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        isPending={deleteFile.isPending}
        description="This action cannot be undone. This will permanently delete the file."
        onConfirm={() =>
          deleteFile.mutate(
            { knowledgeFileId: file.id },
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
