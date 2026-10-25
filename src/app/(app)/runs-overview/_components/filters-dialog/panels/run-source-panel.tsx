'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  RunSource,
  RunSourceDescription,
  RunSourceLabel,
} from '@/server/runs-overview/constants';
import type { RunsOverviewFilters } from '@/server/runs-overview/types';

type RunSourcePanelProps = {
  draft: RunsOverviewFilters;
  onChange: (draft: RunsOverviewFilters) => void;
};

const toggledSource = (
  sources: RunSource[],
  source: RunSource,
  checked: boolean,
) => {
  const rest = sources.filter((item) => item !== source);
  if (checked) return [...rest, source];
  return rest;
};

export function RunSourcePanel({ draft, onChange }: RunSourcePanelProps) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs text-muted-foreground">
        Select neither to see every run.
      </p>
      {Object.values(RunSource).map((source) => {
        const id = `overview-run-source-${source}`;
        return (
          <div key={source} className="flex items-start gap-2">
            <Checkbox
              id={id}
              checked={draft.runSources.includes(source)}
              onCheckedChange={(checked) =>
                onChange({
                  ...draft,
                  runSources: toggledSource(
                    draft.runSources,
                    source,
                    checked === true,
                  ),
                })
              }
            />
            <Label htmlFor={id} className="flex flex-col items-start gap-0.5">
              <span className="text-sm">{RunSourceLabel[source]}</span>
              <span className="text-xs font-normal text-muted-foreground">
                {RunSourceDescription[source]}
              </span>
            </Label>
          </div>
        );
      })}
    </div>
  );
}
