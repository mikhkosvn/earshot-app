'use client';

import { SearchIcon } from 'lucide-react';
import { useState } from 'react';

import { Input } from '@/components/ui/input';

import { FolderList } from './folder-list';
import { FolderSidebarHeader } from './folder-sidebar-header';

export function FolderSidebar() {
  const [search, setSearch] = useState('');

  return (
    <aside className="flex w-48 shrink-0 flex-col gap-2 overflow-y-auto border-r bg-background p-2">
      <FolderSidebarHeader />
      <div className="relative">
        <SearchIcon className="pointer-events-none absolute top-1/2 left-2 size-3.5 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          placeholder="Search folders..."
          aria-label="Search folders"
          className="h-7 pl-7 text-xs md:text-xs"
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>
      <FolderList search={search} />
    </aside>
  );
}
