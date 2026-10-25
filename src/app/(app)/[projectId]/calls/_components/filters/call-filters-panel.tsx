'use client';

import { PlusIcon, XIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

import { useMetricColumnsQuery } from '../../_hooks/call-list/use-metric-columns-query';
import { useCallFiltersParam } from '../../_hooks/call-params/use-call-filters-param';
import {
  draftsToNodes,
  filterFieldOptions,
  newFilterDraft,
  nodesToDrafts,
  type FilterDraft,
} from '../../_utils/filter-draft';
import { FilterRow } from './filter-row';
import { FilterRowsEmpty } from './filter-rows-empty';

interface CallFiltersPanelProps {
  onClose: () => void;
}

export function CallFiltersPanel({ onClose }: CallFiltersPanelProps) {
  const { conditions, setConditions } = useCallFiltersParam();
  const { data: metrics } = useMetricColumnsQuery();
  const options = filterFieldOptions(metrics);
  const [drafts, setDrafts] = useState<FilterDraft[]>(() =>
    nodesToDrafts(conditions),
  );

  const apply = () => {
    void setConditions(draftsToNodes(drafts, options));
    onClose();
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between border-b px-3 py-2">
        <h3 className="text-sm font-medium">Filters</h3>
        <Button
          variant="ghost"
          size="icon-xs"
          aria-label="Close filters"
          onClick={onClose}
        >
          <XIcon />
        </Button>
      </div>
      <div className="flex flex-col gap-2 p-3">
        <FilterRowsEmpty count={drafts.length} />
        {drafts.map((draft) => (
          <FilterRow
            key={draft.id}
            draft={draft}
            options={options}
            onChange={(next) =>
              setDrafts((current) =>
                current.map((item) => {
                  if (item.id !== next.id) return item;
                  return next;
                }),
              )
            }
            onRemove={() =>
              setDrafts((current) =>
                current.filter((item) => item.id !== draft.id),
              )
            }
          />
        ))}
      </div>
      <div className="flex items-center justify-between border-t px-3 py-2">
        <Button
          variant="ghost"
          size="sm"
          className="text-xs"
          onClick={() => setDrafts((current) => [...current, newFilterDraft()])}
        >
          <PlusIcon />
          Add filter
        </Button>
        <Button size="sm" className="text-xs" onClick={apply}>
          Apply filters
        </Button>
      </div>
    </div>
  );
}
