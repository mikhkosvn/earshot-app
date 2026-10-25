'use client';

import { format } from 'date-fns';

import { Badge } from '@/components/ui/badge';
import type { AgentVersionItem } from '@/server/agents/types';

import { versionChangeText } from '../../_utils/version-change-text';
import { CurrentVersionBadge } from './current-version-badge';
import { VersionMenu } from './version-menu';
import { VersionName } from './version-name';

interface VersionEntryProps {
  version: AgentVersionItem;
}

export function VersionEntry({ version }: VersionEntryProps) {
  return (
    <li className="flex gap-2 px-3 py-2.5">
      <span
        data-current={version.isCurrent}
        className="mt-1.5 size-1.5 shrink-0 rounded-full bg-muted-foreground data-[current=true]:bg-green-500"
      />
      <div className="flex min-w-0 flex-1 flex-col gap-1 text-xs">
        <div className="flex items-center gap-1.5">
          <Badge variant="outline" className="font-mono">
            v{version.version}
          </Badge>
          <CurrentVersionBadge current={version.isCurrent} />
          <span className="truncate text-muted-foreground">
            {version.createdByEmail}
          </span>
          <span className="flex-1" />
          <VersionMenu version={version} />
        </div>
        <VersionName name={version.name} />
        <p>{format(new Date(version.createdAt), 'MMM d, yyyy · hh:mm a')}</p>
        <p className="text-muted-foreground">{versionChangeText(version)}</p>
      </div>
    </li>
  );
}
