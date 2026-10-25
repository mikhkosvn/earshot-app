'use client';

import { PlusIcon } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { UrlGenerator } from '@/lib/url-generator/url-generator';

import { BulkEnableButtons } from './bulk-enable-buttons';
import { FilterSelect } from './filter-select';
import { PersonalitySearchField } from './personality-search-field';
import { LanguageFilter } from './language-filter';
import {
  GENDER_FILTER_ITEMS,
  TYPE_FILTER_ITEMS,
} from '../../../_constants/filter-items';
import { usePersonalityFilters } from '../../../_hooks/list/use-personality-filters';

export function PersonalityToolbar() {
  const [filters, setFilters] = usePersonalityFilters();

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border bg-background p-2">
      <div className="flex flex-wrap items-center gap-2">
        <PersonalitySearchField />
        <FilterSelect
          label="Gender"
          items={GENDER_FILTER_ITEMS}
          value={filters.gender}
          onChange={(gender) => setFilters({ gender })}
        />
        <FilterSelect
          label="Type"
          items={TYPE_FILTER_ITEMS}
          value={filters.type}
          onChange={(type) => setFilters({ type })}
        />
        <LanguageFilter />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <BulkEnableButtons />
        <Button
          size="sm"
          nativeButton={false}
          render={<Link href={UrlGenerator.personalityCreate()} />}
        >
          <PlusIcon />
          Create Personality
        </Button>
      </div>
    </div>
  );
}
