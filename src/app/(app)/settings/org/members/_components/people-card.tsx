'use client';

import { SearchInput } from '@/components/common/search-input/search-input';
import { Badge } from '@/components/ui/badge';

import { useMembers } from '../_hooks/use-members';
import { MEMBER_SEARCH_PARAM } from '../_utils/filter-members';
import { MemberTable } from './member-table/member-table';

export function PeopleCard() {
  const members = useMembers();

  return (
    <section className="overflow-hidden rounded-lg border bg-background">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b px-3 py-2.5">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold">People</h2>
          <Badge variant="secondary">{members.length}</Badge>
        </div>
        <SearchInput
          placeholder="Search people"
          paramKey={MEMBER_SEARCH_PARAM}
        />
      </div>
      <MemberTable />
    </section>
  );
}
