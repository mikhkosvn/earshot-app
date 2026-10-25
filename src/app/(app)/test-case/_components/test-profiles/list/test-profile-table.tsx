'use client';

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { TestProfileView } from '@/server/test-profiles/types';

import { TestProfileEmptyRow } from './test-profile-empty-row';
import { TestProfileRow } from './row/test-profile-row';

type TestProfileTableProps = {
  profiles: TestProfileView[];
  onEdit: (profile: TestProfileView) => void;
};

export function TestProfileTable({ profiles, onEdit }: TestProfileTableProps) {
  return (
    <div className="max-h-[55dvh] overflow-auto rounded-lg border">
      <Table className="text-xs">
        <TableHeader className="sticky top-0 bg-background">
          <TableRow>
            <TableHead className="w-8" />
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Agent</TableHead>
            <TableHead>Scenarios</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Updated</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {profiles.map((profile) => (
            <TestProfileRow
              key={profile.id}
              profile={profile}
              onEdit={onEdit}
            />
          ))}
          <TestProfileEmptyRow count={profiles.length} />
        </TableBody>
      </Table>
    </div>
  );
}
