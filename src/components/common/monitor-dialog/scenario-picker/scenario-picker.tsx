'use client';

import { ChevronDownIcon, SearchIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { ScenarioClearButton } from './scenario-clear-button';
import { ScenarioFolderList } from './scenario-folder-list';
import { ScenarioPickerTriggerLabel } from './scenario-picker-trigger-label';

type ScenarioPickerProps = {
  id: string;
  value: number[];
  onValueChange: (evaluatorIds: number[]) => void;
  invalid?: boolean;
};

export function ScenarioPicker({
  id,
  value,
  onValueChange,
  invalid,
}: ScenarioPickerProps) {
  const [isOpen, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [openFolders, setOpenFolders] = useState<string[]>([]);

  return (
    <Popover open={isOpen} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            id={id}
            type="button"
            variant="outline"
            aria-invalid={invalid}
            className="h-auto min-h-8 w-full justify-between gap-2 bg-background py-1 font-normal"
          />
        }
      >
        <ScenarioPickerTriggerLabel value={value} />
        <ChevronDownIcon className="text-muted-foreground" />
      </PopoverTrigger>
      <PopoverContent align="start" className="w-(--anchor-width) gap-0 p-0">
        <div className="flex items-center gap-1 border-b p-1">
          <InputGroup className="border-0 shadow-none">
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
            <InputGroupInput
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search in opened folders..."
              aria-label="Search in opened folders"
            />
          </InputGroup>
          <ScenarioClearButton
            selectedCount={value.length}
            onClear={() => onValueChange([])}
          />
        </div>
        <ScenarioFolderList
          openFolders={openFolders}
          onOpenFoldersChange={setOpenFolders}
          search={search}
          value={value}
          onValueChange={onValueChange}
        />
        <div className="flex items-center justify-between border-t bg-muted/40 px-3 py-1.5">
          <span className="text-xs text-muted-foreground">
            {value.length} selected
          </span>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setOpen(false)}
          >
            Done
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
