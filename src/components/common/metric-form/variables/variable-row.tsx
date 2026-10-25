'use client';

import { Button } from '@/components/ui/button';
import type { MetricVariable } from '@/server/metrics/constants/definition/metric-variables';

import { useCopyVariable } from '../_hooks/use-copy-variable';

type VariableRowProps = {
  variable: MetricVariable;
};

export function VariableRow({ variable }: VariableRowProps) {
  const copyVariable = useCopyVariable();

  return (
    <Button
      type="button"
      variant="unstyled"
      size="unstyled"
      className="flex w-full flex-col items-start gap-1.5 rounded-lg border bg-muted/30 p-2.5 text-left whitespace-normal hover:bg-muted"
      onClick={() => copyVariable(variable.code)}
    >
      <span className="flex w-full items-start justify-between gap-2">
        <code className="rounded-sm border bg-background px-1.5 py-0.5 font-mono text-xs">
          {variable.code}
        </code>
        <span className="text-[11px] font-normal text-muted-foreground">
          Click to copy
        </span>
      </span>
      <span className="text-xs font-normal text-muted-foreground">
        {variable.description}
      </span>
    </Button>
  );
}
