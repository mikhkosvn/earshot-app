'use client';

import { SearchIcon } from 'lucide-react';
import { type ReactNode, useState } from 'react';

import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { FilterEmptyHint } from './filter-empty-hint';

type FilterOption<TValue extends string | number> = {
  value: TValue;
  label: string;
};

type FilterOptionListProps<TValue extends string | number> = {
  name: string;
  options: FilterOption<TValue>[];
  value: TValue[];
  onValueChange: (value: TValue[]) => void;
  logicSelect?: ReactNode;
};

const toggle = <TValue,>(values: TValue[], value: TValue) => {
  if (values.includes(value)) return values.filter((item) => item !== value);
  return [...values, value];
};

export function FilterOptionList<TValue extends string | number>({
  name,
  options,
  value,
  onValueChange,
  logicSelect,
}: FilterOptionListProps<TValue>) {
  const [search, setSearch] = useState('');
  const needle = search.trim().toLowerCase();
  const visible = options.filter((option) =>
    option.label.toLowerCase().includes(needle),
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 border-b pb-2">
        <div className="relative flex-1">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            placeholder={`Search ${name}`}
            aria-label={`Search ${name}`}
            className="h-8 pl-7"
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        {logicSelect}
      </div>
      <div className="flex h-64 flex-col gap-0.5 overflow-y-auto">
        {visible.map((option) => {
          const id = `filter-${name}-${option.value}`;
          return (
            <div
              key={option.value}
              className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-muted"
            >
              <Checkbox
                id={id}
                checked={value.includes(option.value)}
                onCheckedChange={() =>
                  onValueChange(toggle(value, option.value))
                }
              />
              <Label htmlFor={id} className="flex-1 font-normal">
                {option.label}
              </Label>
            </div>
          );
        })}
        <FilterEmptyHint count={visible.length} />
      </div>
    </div>
  );
}
