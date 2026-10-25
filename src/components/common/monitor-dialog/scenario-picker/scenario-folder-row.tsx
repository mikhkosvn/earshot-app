'use client';

import { ChevronRightIcon, FolderIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import type { MonitorScenarioFolder } from '@/server/monitors/types';

import {
  countSelectedInFolder,
  filterScenarios,
  FolderSelection,
  folderSelection,
  toggleFolder,
  toggleId,
} from '../_utils/scenario-selection';
import { ScenarioRow } from './scenario-row';

interface ScenarioFolderRowProps {
  folder: MonitorScenarioFolder;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  search: string;
  value: readonly number[];
  onValueChange: (evaluatorIds: number[]) => void;
}

export function ScenarioFolderRow({
  folder,
  isOpen,
  onOpenChange,
  search,
  value,
  onValueChange,
}: ScenarioFolderRowProps) {
  const selection = folderSelection(folder, value);

  return (
    <Collapsible open={isOpen} onOpenChange={onOpenChange}>
      <div className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-muted/60">
        <CollapsibleTrigger
          render={
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              aria-label={`Open ${folder.name}`}
            />
          }
        >
          <ChevronRightIcon className="transition-transform group-data-panel-open:rotate-90 data-panel-open:rotate-90" />
        </CollapsibleTrigger>
        <Checkbox
          aria-label={`Select all scenarios in ${folder.name}`}
          disabled={!isOpen || folder.scenarios.length === 0}
          checked={selection === FolderSelection.all}
          indeterminate={selection === FolderSelection.some}
          onCheckedChange={() => onValueChange(toggleFolder(folder, value))}
        />
        <FolderIcon className="size-4 text-muted-foreground" />
        <span className="min-w-0 flex-1 truncate">{folder.name}</span>
        <span className="text-xs text-muted-foreground tabular-nums">
          {countSelectedInFolder(folder, value)}/{folder.scenarios.length}
        </span>
      </div>
      <CollapsibleContent>
        {filterScenarios(folder, search).map((scenario) => (
          <ScenarioRow
            key={scenario.id}
            scenario={scenario}
            checked={value.includes(scenario.id)}
            onToggle={() => onValueChange(toggleId(value, scenario.id))}
          />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}
