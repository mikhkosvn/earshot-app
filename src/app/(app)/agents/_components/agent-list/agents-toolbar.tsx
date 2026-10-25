import { PlusIcon } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { UrlGenerator } from '@/lib/url-generator/url-generator';

import { AgentSearchForm } from './agent-search-form';

export function AgentsToolbar() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <AgentSearchForm />
      <Button
        size="sm"
        nativeButton={false}
        render={<Link href={UrlGenerator.agentNew()} />}
      >
        <PlusIcon />
        Create Agent
      </Button>
    </div>
  );
}
