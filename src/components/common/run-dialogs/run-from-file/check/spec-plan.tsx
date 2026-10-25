import { CircleCheckIcon } from 'lucide-react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { TestSuitePlan } from '@/server/runs/types';

import { runCountText, testCaseCountText } from '../../_utils/run-dialog-text';

interface SpecPlanProps {
  plan: TestSuitePlan;
}

export function SpecPlan({ plan }: SpecPlanProps) {
  return (
    <div className="flex flex-col gap-2">
      <p className="flex items-center gap-1.5 text-sm font-medium text-emerald-700 dark:text-emerald-400">
        <CircleCheckIcon className="size-4" />
        Spec looks good
      </p>
      <p className="text-xs text-muted-foreground">
        {testCaseCountText(plan.scenarioCount)} · {runCountText(plan.totalRuns)}{' '}
        · {plan.channel}
      </p>
      <div className="max-h-48 overflow-y-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Test case</TableHead>
              <TableHead>Runs</TableHead>
              <TableHead>Metrics</TableHead>
              <TableHead>Personality</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {plan.scenarios.map((scenario) => (
              <TableRow key={scenario.key}>
                <TableCell>{scenario.name}</TableCell>
                <TableCell>{scenario.runs}</TableCell>
                <TableCell>{scenario.metricCount}</TableCell>
                <TableCell>{scenario.personalityName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <p className="text-xs text-muted-foreground">Ready to run.</p>
    </div>
  );
}
