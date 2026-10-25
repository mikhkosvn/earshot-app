'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { useRunsOverviewQuery } from '../../../_hooks/use-runs-overview-query';
import { OverviewSection } from './overview-section';

export function TopFailedScenarios() {
  const { data: overview } = useRunsOverviewQuery();

  if (overview.topScenariosFailed.length === 0) {
    return (
      <OverviewSection title="Top failed scenarios">
        <p className="py-10 text-center text-sm text-muted-foreground">
          No data available
        </p>
      </OverviewSection>
    );
  }

  return (
    <OverviewSection title="Top failed scenarios">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="pl-3">Scenario</TableHead>
            <TableHead className="text-right">Failed runs</TableHead>
            <TableHead className="pr-3 text-right">Total runs</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {overview.topScenariosFailed.map((scenario) => (
            <TableRow key={scenario.name}>
              <TableCell className="pl-3">{scenario.name}</TableCell>
              <TableCell className="text-right tabular-nums">
                {scenario.failedCount}
              </TableCell>
              <TableCell className="pr-3 text-right tabular-nums">
                {scenario.totalCount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </OverviewSection>
  );
}
