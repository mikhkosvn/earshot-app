'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';

import { MenuSearchInput } from '@/app/(app)/_components/menu-search-input';
import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { filterByName } from '@/app/(app)/_utils/filter-by-name';
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

import { useViewParam } from '../../_hooks/use-view-param';
import { MetricService } from '../../_service';
import { SavedViewMenuItem } from './saved-view-menu-item';

interface SelectViewMenuBodyProps {
  onCreateView: () => void;
}

export function SelectViewMenuBody({ onCreateView }: SelectViewMenuBodyProps) {
  const [query, setQuery] = useState('');
  const projectId = useCurrentProjectId();
  const { viewId, setView } = useViewParam();
  const { data: views } = useSuspenseQuery(
    MetricService.getSavedViewsQuery({ projectId }),
  );

  return (
    <>
      <MenuSearchInput
        value={query}
        onValueChange={setQuery}
        placeholder="Search Views..."
      />
      <DropdownMenuSeparator />
      <DropdownMenuItem
        data-current={viewId === null}
        className="text-xs data-[current=true]:bg-muted"
        onClick={() => setView(null)}
      >
        None
      </DropdownMenuItem>
      <div className="flex max-h-50 flex-col overflow-y-auto">
        {filterByName(views, query).map((view) => (
          <SavedViewMenuItem key={view.id} view={view} />
        ))}
      </div>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="text-xs" onClick={onCreateView}>
        <PlusIcon />
        Create New View
      </DropdownMenuItem>
    </>
  );
}
