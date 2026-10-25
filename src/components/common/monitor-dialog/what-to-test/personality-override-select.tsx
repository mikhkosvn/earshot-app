'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { MonitorService } from '../_service';
import { toggleId } from '../_utils/scenario-selection';
import { SelectionChips } from '../form/selection-chips';

type PersonalityOverrideSelectProps = {
  id: string;
  value: number[];
  onValueChange: (personalityIds: number[]) => void;
};

export function PersonalityOverrideSelect({
  id,
  value,
  onValueChange,
}: PersonalityOverrideSelectProps) {
  const projectId = useCurrentProjectId();
  const { data: personalities } = useSuspenseQuery(
    MonitorService.getPersonalityOptionsQuery({ projectId }),
  );
  const [isOpen, setOpen] = useState(false);
  const labels = personalities
    .filter((personality) => value.includes(personality.id))
    .map((personality) => personality.name);

  return (
    <Popover open={isOpen} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            id={id}
            type="button"
            variant="outline"
            className="h-auto min-h-8 w-full justify-between gap-2 bg-background py-1 font-normal"
          />
        }
      >
        <SelectionChips labels={labels} placeholder="Select Personalities" />
        <ChevronDownIcon className="text-muted-foreground" />
      </PopoverTrigger>
      <PopoverContent align="start" className="w-(--anchor-width) p-0">
        <Command>
          <CommandInput placeholder="Search personalities..." />
          <CommandList>
            <CommandEmpty>No personality found.</CommandEmpty>
            <CommandGroup>
              {personalities.map((personality) => (
                <CommandItem
                  key={personality.id}
                  value={`${personality.name} ${personality.id}`}
                  data-checked={value.includes(personality.id)}
                  onSelect={() =>
                    onValueChange(toggleId(value, personality.id))
                  }
                >
                  {personality.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <div className="flex justify-between border-t p-1">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              disabled={value.length === 0}
              onClick={() => onValueChange([])}
            >
              Clear
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setOpen(false)}
            >
              Done
            </Button>
          </div>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
