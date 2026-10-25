'use client';

import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';

import { CopyButton } from '@/components/common/clipboard/copy-button';
import { Button } from '@/components/ui/button';
import { UrlGenerator } from '@/lib/url-generator/url-generator';

import { useAgent } from '../../_hooks/use-agent';
import { AgentSwitcher } from './agent-switcher';
import { ReconfigureButton } from './reconfigure-button';
import { SaveChangesButton } from './save-changes-button';
import { TestConnectionsButton } from './test-connections-button';
import { VersionHistoryButton } from '../version-history/version-history-button';

export function AgentSettingsHeader() {
  const agent = useAgent();

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border bg-background px-3 py-2.5">
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon-sm"
          aria-label="Back to agents"
          nativeButton={false}
          render={<Link href={UrlGenerator.agents()} />}
        >
          <ArrowLeftIcon />
        </Button>
        <div className="flex flex-col gap-0.5">
          <h1 className="text-base font-semibold">Agent Settings</h1>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="font-mono">ID: #{agent.id}</span>
            <CopyButton value={String(agent.id)} label="Copy agent ID" />
            <span>|</span>
            <AgentSwitcher />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <VersionHistoryButton />
        <TestConnectionsButton />
        <ReconfigureButton />
        <SaveChangesButton />
      </div>
    </div>
  );
}
