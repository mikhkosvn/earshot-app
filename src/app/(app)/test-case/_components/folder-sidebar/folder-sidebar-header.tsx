'use client';

import { PlusIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

import { CreateFolderDialog } from './dialogs/create-folder-dialog';

export function FolderSidebarHeader() {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="flex items-center justify-between px-1">
      <span className="text-[11px] font-semibold tracking-wide text-muted-foreground">
        FOLDERS
      </span>
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        aria-label="Create folder"
        onClick={() => setOpen(true)}
      >
        <PlusIcon />
      </Button>
      <CreateFolderDialog
        open={isOpen}
        onOpenChange={setOpen}
        parentPath={null}
      />
    </div>
  );
}
