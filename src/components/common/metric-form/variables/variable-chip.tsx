'use client';

import { Button } from '@/components/ui/button';

import { useCopyVariable } from '../_hooks/use-copy-variable';

type VariableChipProps = {
  code: string;
};

export function VariableChip({ code }: VariableChipProps) {
  const copyVariable = useCopyVariable();

  return (
    <Button
      type="button"
      variant="outline"
      size="xs"
      aria-label={`Copy ${code}`}
      className="text-[11px] font-normal"
      onClick={() => copyVariable(code)}
    >
      {code}
    </Button>
  );
}
