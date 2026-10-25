'use client';

import { ArrowRightIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

import { useMetricVersions } from '@/components/common/metric-history/_hooks/use-metric-versions';
import { versionLabel } from '@/components/common/metric-history/_utils/version-text';
import { CompareResult, type ComparedPair } from './compare-result';
import { VersionSelect } from './version-select';

const MIN_VERSIONS_TO_COMPARE = 2;

export function CompareVersionsCard() {
  const versions = useMetricVersions();
  const [fromId, setFromId] = useState<number | null>(null);
  const [toId, setToId] = useState<number | null>(null);
  const [compared, setCompared] = useState<ComparedPair | null>(null);
  const items = versions.map((version) => ({
    value: version.id,
    label: versionLabel(version.version),
  }));

  if (versions.length < MIN_VERSIONS_TO_COMPARE) return null;

  return (
    <section className="flex flex-col gap-3 rounded-lg border bg-background p-3">
      <h2 className="text-sm font-semibold">Compare Versions</h2>
      <div className="flex items-center gap-2">
        <VersionSelect
          label="From version"
          placeholder="From…"
          items={items}
          value={fromId}
          onValueChange={setFromId}
        />
        <ArrowRightIcon className="size-4 shrink-0 text-muted-foreground" />
        <VersionSelect
          label="To version"
          placeholder="To…"
          items={items}
          value={toId}
          onValueChange={setToId}
        />
      </div>
      <Button
        type="button"
        disabled={fromId === null || toId === null}
        onClick={() => {
          if (fromId === null || toId === null) return;
          setCompared({ fromId, toId });
        }}
      >
        Compare
      </Button>
      <CompareResult compared={compared} />
    </section>
  );
}
