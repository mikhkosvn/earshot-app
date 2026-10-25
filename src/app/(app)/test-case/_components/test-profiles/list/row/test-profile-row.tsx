'use client';

import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { TableCell, TableRow } from '@/components/ui/table';
import type { TestProfileView } from '@/server/test-profiles/types';

import { useLinkedTestProfileParam } from '@/app/(app)/test-case/_hooks/test-profiles/use-linked-test-profile-param';
import { formatAuthorDate } from '@/app/(app)/test-case/_utils/format-author-date';
import { RowExpandButton } from '@/app/(app)/test-case/_components/table/row/row-expand-button';
import { AgentChip } from '@/app/(app)/test-case/_components/table/row/agent-chip';
import { DefaultProfileBadge } from './default-profile-badge';
import { ScenarioCountChip } from './scenario-count-chip';
import { TestProfileRowActions } from './test-profile-row-actions';
import { TestProfileVariablesRow } from './test-profile-variables-row';
import { UpdatedCell } from './updated-cell';

type TestProfileRowProps = {
  profile: TestProfileView;
  onEdit: (profile: TestProfileView) => void;
};

export function TestProfileRow({ profile, onEdit }: TestProfileRowProps) {
  const [linkedProfileId] = useLinkedTestProfileParam();
  const [isExpanded, setExpanded] = useState(
    () => linkedProfileId === profile.id,
  );

  return (
    <>
      <TableRow>
        <TableCell>
          <RowExpandButton
            isExpanded={isExpanded}
            onToggle={() => setExpanded(!isExpanded)}
          />
        </TableCell>
        <TableCell>
          <Badge variant="outline" className="font-mono">
            {profile.id}
          </Badge>
        </TableCell>
        <TableCell className="max-w-72">
          <div className="flex items-center gap-2">
            <span className="truncate">{profile.name}</span>
            <DefaultProfileBadge isDefault={profile.isDefault} />
          </div>
        </TableCell>
        <TableCell>
          <AgentChip agentId={profile.agentId} agentName={profile.agentName} />
        </TableCell>
        <TableCell>
          <ScenarioCountChip count={profile.evaluatorCount} />
        </TableCell>
        <TableCell className="whitespace-nowrap">
          {formatAuthorDate(profile.createdAt, profile.createdByName)}
        </TableCell>
        <TableCell className="whitespace-nowrap">
          <UpdatedCell profile={profile} />
        </TableCell>
        <TableCell>
          <TestProfileRowActions profile={profile} onEdit={onEdit} />
        </TableCell>
      </TableRow>
      <TestProfileVariablesRow profile={profile} isExpanded={isExpanded} />
    </>
  );
}
