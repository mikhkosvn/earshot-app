'use client';

import { PlusIcon, XIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

import { useApplyResultFilters } from '../../_hooks/filters/use-apply-result-filters';
import { useResultFilterParams } from '../../_hooks/use-result-filter-params';
import {
  draftsToParams,
  EMPTY_RESULT_FILTER_PARAMS,
  newResultFilterDraft,
  paramsToDrafts,
  type ResultFilterDraft,
} from '../../_utils/results-list/filter-drafts';
import { ResultFilterRow } from './result-filter-row';
import { ResultFilterRowsEmpty } from './result-filter-rows-empty';

interface ResultFiltersPanelProps {
  pageParamKey: string;
  onClose: () => void;
}

export function ResultFiltersPanel({
  pageParamKey,
  onClose,
}: ResultFiltersPanelProps) {
  const [params] = useResultFilterParams();
  const applyFilters = useApplyResultFilters(pageParamKey);
  const [drafts, setDrafts] = useState<ResultFilterDraft[]>(() =>
    paramsToDrafts(params),
  );

  const apply = () => {
    applyFilters(draftsToParams(drafts));
    onClose();
  };

  const clear = () => {
    setDrafts([]);
    applyFilters(EMPTY_RESULT_FILTER_PARAMS);
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between border-b px-3 py-2">
        <h3 className="text-sm font-medium">Filters</h3>
        <Button
          variant="ghost"
          size="icon-xs"
          aria-label="Close"
          onClick={onClose}
        >
          <XIcon />
        </Button>
      </div>
      <div className="flex flex-col gap-2 p-3">
        <ResultFilterRowsEmpty count={drafts.length} />
        {drafts.map((draft) => (
          <ResultFilterRow
            key={draft.id}
            draft={draft}
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
          onClick={() =>
            setDrafts((current) => [...current, newResultFilterDraft()])
          }
        >
          <PlusIcon />
          Add filter
        </Button>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="text-xs" onClick={clear}>
            Clear
          </Button>
          <Button size="sm" className="text-xs" onClick={apply}>
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
}
