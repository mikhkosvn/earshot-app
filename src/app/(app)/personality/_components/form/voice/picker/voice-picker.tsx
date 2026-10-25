'use client';

import { ChevronsUpDownIcon } from 'lucide-react';
import { Suspense, useState } from 'react';

import { QueryErrorBoundary } from '@/components/common/query-error-boundary';
import { Button } from '@/components/ui/button';
import { Command, CommandInput, CommandList } from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import type { VoiceModel } from '@/generated/prisma/enums';

import { useCurrentProjectId } from '@/app/(app)/_hooks/use-current-project-id';

import { PersonalityService } from '../../../../_service';
import { usePrefetchQuery } from '../../../../_hooks/use-prefetch-query';
import { VoiceOptions } from './voice-options';
import { VoicePickerValue } from './voice-picker-value';

interface VoicePickerProps {
  id: string;
  voiceModel: VoiceModel;
  value: string;
  invalid: boolean;
  onChange: (value: string) => void;
}

export function VoicePicker({
  id,
  voiceModel,
  value,
  invalid,
  onChange,
}: VoicePickerProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const projectId = useCurrentProjectId();
  const prefetch = usePrefetchQuery();

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        if (next)
          prefetch(
            PersonalityService.getVoicesQuery({ projectId, voiceModel }),
          );
        setOpen(next);
      }}
    >
      <PopoverTrigger
        render={
          <Button
            id={id}
            type="button"
            variant="outline"
            aria-invalid={invalid}
            className="w-full justify-between font-normal"
          />
        }
      >
        <VoicePickerValue value={value} />
        <ChevronsUpDownIcon className="text-muted-foreground" />
      </PopoverTrigger>
      <PopoverContent align="end" className="w-96 p-0">
        <Command shouldFilter>
          <CommandInput
            value={search}
            placeholder="Search voices..."
            onValueChange={setSearch}
          />
          <CommandList>
            <QueryErrorBoundary>
              <Suspense
                fallback={
                  <p className="p-3 text-xs text-muted-foreground">
                    Loading voices...
                  </p>
                }
              >
                <VoiceOptions
                  voiceModel={voiceModel}
                  search={search}
                  onSelect={(voiceId) => {
                    onChange(voiceId);
                    setOpen(false);
                  }}
                />
              </Suspense>
            </QueryErrorBoundary>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
