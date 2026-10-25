'use client';

import { TablePagination } from '@/components/common/table-pagination/table-pagination';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { useAgentListQuery } from '../../_hooks/agent-list/use-agent-list-query';
import { AgentRow } from './agent-row';
import { AgentsEmptyRow } from './agents-empty-row';
import { AgentsTableSkeleton } from './agents-table-skeleton';

export function AgentsTable() {
  const { data } = useAgentListQuery();
  if (!data) return <AgentsTableSkeleton />;

  return (
    <div className="flex flex-col gap-2">
      <div className="rounded-lg border bg-background">
        <Table className="text-xs">
          <TableHeader>
            <TableRow>
              <TableHead className="w-28">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Provider</TableHead>
              <TableHead>Connections</TableHead>
              <TableHead>Language</TableHead>
              <TableHead className="w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.results.map((agent) => (
              <AgentRow key={agent.id} agent={agent} />
            ))}
            <AgentsEmptyRow count={data.results.length} />
          </TableBody>
        </Table>
      </div>
      <TablePagination totalCount={data.count} />
    </div>
  );
}
