'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { ArrowRightIcon } from 'lucide-react';
import { useState } from 'react';

import { OptionSelect } from '@/app/(app)/test-case/_components/fields/option-select';
import { EvaluatorService } from '@/app/(app)/test-case/_service';
import { Button } from '@/components/ui/button';

import { useEvaluatorId } from '../../_hooks/use-evaluator-id';
import { VersionDiff } from './version-diff';

interface ComparedPair {
  fromId: number;
  toId: number;
}

export function CompareVersionsCard() {
  const evaluatorId = useEvaluatorId();
  const { data: items } = useSuspenseQuery({
    ...EvaluatorService.getVersionsQuery({ evaluatorId }),
    select: (versions) =>
      versions.map((version) => ({
        value: version.id,
        label: `v${version.version}`,
      })),
  });
  const [fromId, setFromId] = useState<number | null>(null);
  const [toId, setToId] = useState<number | null>(null);
  const [compared, setCompared] = useState<ComparedPair | null>(null);

  return (
    <section className="flex flex-col gap-3 rounded-xl border bg-background p-3">
      <h2 className="text-sm font-semibold">Compare Versions</h2>
      <div className="flex items-center gap-2">
        <OptionSelect
          items={items}
          value={fromId}
          onValueChange={setFromId}
          placeholder="From…"
          className="h-8"
        />
        <ArrowRightIcon className="size-4 shrink-0 text-muted-foreground" />
        <OptionSelect
          items={items}
          value={toId}
          onValueChange={setToId}
          placeholder="To…"
          className="h-8"
        />
      </div>
      <Button
        type="button"
        size="sm"
        disabled={fromId === null || toId === null || fromId === toId}
        onClick={() => {
          if (fromId === null || toId === null) return;
          setCompared({ fromId, toId });
        }}
      >
        Compare
      </Button>
      <VersionDiff compared={compared} />
    </section>
  );
}
