'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { PlusIcon, SearchIcon } from 'lucide-react';
import { useState } from 'react';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { TestProfileView } from '@/server/test-profiles/types';

import { useLinkedTestProfileParam } from '../../../_hooks/test-profiles/use-linked-test-profile-param';
import { EvaluatorService } from '../../../_service';
import { TestProfileFormDialog } from '../form/test-profile-form-dialog';
import { TestProfileTable } from './test-profile-table';
import { TestProfilesFooter } from './test-profiles-footer';

const PROFILE_PAGE_SIZE = 20;

const matches = (profile: TestProfileView, needle: string) =>
  String(profile.id).includes(needle) ||
  profile.name.toLowerCase().includes(needle);

const isLinked = (profile: TestProfileView, linkedProfileId: number | null) =>
  linkedProfileId === null || profile.id === linkedProfileId;

export function TestProfilesBrowser() {
  const projectId = useCurrentProjectId();
  const { data: profiles } = useSuspenseQuery(
    EvaluatorService.getTestProfilesQuery({ projectId, agentId: null }),
  );
  const [linkedProfileId] = useLinkedTestProfileParam();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isFormOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<TestProfileView | null>(null);
  const needle = search.trim().toLowerCase();
  const filtered = profiles.filter(
    (profile) => isLinked(profile, linkedProfileId) && matches(profile, needle),
  );
  const pageRows = filtered.slice(
    (page - 1) * PROFILE_PAGE_SIZE,
    page * PROFILE_PAGE_SIZE,
  );
  const openForm = (profile: TestProfileView | null) => {
    setEditing(profile);
    setFormOpen(true);
  };

  return (
    <div className="flex min-h-0 flex-col gap-3">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            placeholder="Search by ID or name..."
            aria-label="Search test profiles"
            className="pl-7"
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
          />
        </div>
        <Button type="button" onClick={() => openForm(null)}>
          <PlusIcon />
          Create
        </Button>
      </div>
      <TestProfileTable profiles={pageRows} onEdit={openForm} />
      <TestProfilesFooter
        page={page}
        pageSize={PROFILE_PAGE_SIZE}
        total={filtered.length}
        onPageChange={setPage}
      />
      <TestProfileFormDialog
        key={editing?.id ?? 'new'}
        open={isFormOpen}
        onOpenChange={setFormOpen}
        profile={editing}
      />
    </div>
  );
}
