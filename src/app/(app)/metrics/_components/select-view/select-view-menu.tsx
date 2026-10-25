'use client';

import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { CreateViewDialog } from './create-view-dialog';
import { SelectViewLabel } from './select-view-label';
import { SelectViewMenuBody } from './select-view-menu-body';

export function SelectViewMenu() {
  const [createOpen, setCreateOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="outline"
              size="sm"
              className="w-45 justify-between text-xs font-normal"
            />
          }
        >
          <SelectViewLabel />
          <ChevronDownIcon className="text-muted-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-50">
          <SelectViewMenuBody onCreateView={() => setCreateOpen(true)} />
        </DropdownMenuContent>
      </DropdownMenu>
      <CreateViewDialog open={createOpen} onOpenChange={setCreateOpen} />
    </>
  );
}
