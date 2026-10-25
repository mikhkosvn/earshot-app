'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { AgentService } from '../../../_service';
import { useAgentId } from '../../_hooks/use-agent-id';
import { recordCountText } from '../../_utils/record-count-text';
import { VersionEntry } from './version-entry';

export function VersionList() {
  const agentId = useAgentId();
  const { data } = useSuspenseQuery(AgentService.getVersionsQuery({ agentId }));

  return (
    <div className="rounded-xl border">
      <div className="flex items-center justify-between border-b px-3 py-2.5">
        <h3 className="text-sm font-semibold">Change History</h3>
        <span className="text-xs text-muted-foreground">
          {recordCountText(data.count)}
        </span>
      </div>
      <ol className="flex flex-col divide-y">
        {data.results.map((version) => (
          <VersionEntry key={version.id} version={version} />
        ))}
      </ol>
    </div>
  );
}
