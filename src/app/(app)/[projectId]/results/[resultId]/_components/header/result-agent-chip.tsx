'use client';

import { ArrowUpRightIcon, BotIcon } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { UrlGenerator } from '@/lib/url-generator/url-generator';

import { useResultDetail } from '../../_hooks/use-result-detail';
import { HeaderChip } from './header-chip';

export function ResultAgentChip() {
  const { agent } = useResultDetail();
  if (!agent) return null;

  return (
    <HeaderChip>
      <BotIcon className="text-muted-foreground" />
      <span>{agent.name}</span>
      <span className="text-muted-foreground">{agent.versionLabel}</span>
      <Button
        variant="ghost"
        size="icon-xs"
        aria-label={`Go to ${agent.name}`}
        nativeButton={false}
        render={<Link href={UrlGenerator.agent({ agentId: agent.id })} />}
      >
        <ArrowUpRightIcon />
      </Button>
    </HeaderChip>
  );
}
