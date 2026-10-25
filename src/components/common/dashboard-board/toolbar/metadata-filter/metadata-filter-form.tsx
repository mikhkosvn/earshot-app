'use client';

import { PlusIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import type { MetadataCondition } from '@/server/dashboards/types';

import { DraftActionType } from '../../_constants/draft-action-type';
import type { DashboardBoardState } from '../../_utils/board-types';
import { MetadataFilterRow } from './metadata-filter-row';

interface MetadataFilterFormProps {
  board: DashboardBoardState;
  onApplied: () => void;
}

interface MetadataRow extends MetadataCondition {
  id: string;
}

const toRows = (conditions: MetadataCondition[]): MetadataRow[] => {
  if (conditions.length === 0) {
    return [{ id: crypto.randomUUID(), key: '', value: '' }];
  }
  return conditions.map((condition) => ({
    ...condition,
    id: crypto.randomUUID(),
  }));
};

const isComplete = (row: MetadataRow) =>
  row.key.trim() !== '' && row.value.trim() !== '';

export function MetadataFilterForm({
  board,
  onApplied,
}: MetadataFilterFormProps) {
  const { filters } = board.draft;
  const [rows, setRows] = useState(() => toRows(filters.metadata));
  const canApply = rows.every(isComplete);

  const updateRow = (id: string, change: Partial<MetadataCondition>) =>
    setRows((current) =>
      current.map((row) => {
        if (row.id !== id) return row;
        return { ...row, ...change };
      }),
    );

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={(event) => {
        event.preventDefault();
        if (!canApply) return;
        board.dispatch({
          type: DraftActionType.setFilters,
          filters: {
            ...filters,
            metadata: rows.map((row) => ({
              key: row.key.trim(),
              value: row.value.trim(),
            })),
          },
        });
        onApplied();
      }}
    >
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-medium">Filter by metadata</h3>
        <p className="text-xs text-muted-foreground">
          Scopes every widget to calls whose metadata matches. Click Apply, then
          Save the dashboard to persist.
        </p>
      </div>
      {rows.map((row) => (
        <MetadataFilterRow
          key={row.id}
          condition={row}
          onChange={(change) => updateRow(row.id, change)}
          onRemove={() =>
            setRows((current) => current.filter((item) => item.id !== row.id))
          }
        />
      ))}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="self-start text-xs"
        onClick={() =>
          setRows((current) => [
            ...current,
            { id: crypto.randomUUID(), key: '', value: '' },
          ])
        }
      >
        <PlusIcon />
        Add metadata filter
      </Button>
      <div className="flex justify-end border-t pt-3">
        <Button type="submit" size="sm" disabled={!canApply}>
          Apply
        </Button>
      </div>
    </form>
  );
}
