'use client';

import { UserRoundIcon } from 'lucide-react';

import { EmptyState } from '@/components/common/empty-state';

import { usePersonalityFilters } from '../../_hooks/list/use-personality-filters';
import { usePersonalityListQuery } from '../../_hooks/list/use-personality-list-query';
import { filterPersonalities } from '../../_utils/filter-personalities';
import { PersonalityCard } from './card/personality-card';

export function PersonalityGrid() {
  const { data } = usePersonalityListQuery();
  const [filters] = usePersonalityFilters();
  const items = filterPersonalities(data, filters);
  if (items.length === 0) {
    return (
      <EmptyState
        icon={UserRoundIcon}
        title="No personalities found"
        description="Change the filters or create a personality."
        className="rounded-xl border bg-background"
      />
    );
  }

  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <PersonalityCard key={item.id} item={item} />
      ))}
    </div>
  );
}
