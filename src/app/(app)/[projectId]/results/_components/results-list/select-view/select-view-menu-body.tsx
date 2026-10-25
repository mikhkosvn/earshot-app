'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { MenuSearchInput } from '@/app/(app)/_components/menu-search-input';
import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { filterByName } from '@/app/(app)/_utils/filter-by-name';
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

import { useApplySavedView } from '../../../_hooks/results-list/use-apply-saved-view';
import { useCurrentSavedView } from '../../../_hooks/results-list/use-current-saved-view';
import { savedViewsQuery } from '../../../_utils/results-list/saved-views-query';
import { SavedViewMenuItem } from './saved-view-menu-item';

export function SelectViewMenuBody() {
  const [query, setQuery] = useState('');
  const projectId = useCurrentProjectId();
  const current = useCurrentSavedView();
  const applySavedView = useApplySavedView();
  const { data: views } = useSuspenseQuery(savedViewsQuery(projectId));

  return (
    <>
      <MenuSearchInput
        value={query}
        onValueChange={setQuery}
        placeholder="Search Views..."
      />
      <DropdownMenuSeparator />
      <DropdownMenuItem
        data-current={current === undefined}
        className="text-xs data-[current=true]:bg-muted"
        onClick={() => applySavedView([])}
      >
        None
      </DropdownMenuItem>
      <div className="flex max-h-50 flex-col overflow-y-auto">
        {filterByName(views, query).map((view) => (
          <SavedViewMenuItem key={view.id} view={view} />
        ))}
      </div>
    </>
  );
}
