'use client';

import { ChevronDownIcon, InfoIcon, WifiOffIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  PACKET_LOSS_MAX,
  PACKET_LOSS_MIN,
} from '@/server/personalities/constants/personality-limits';

import { OptionalNumberField } from '../fields/optional-number-field';
import { SliderField } from '../fields/slider-field';
import { AdvancedGroup } from './advanced-group';
import { BackgroundVolumeGroup } from './background-volume-group';

type AdvancedSectionProps = {
  defaultOpen: boolean;
};

export function AdvancedSection({ defaultOpen }: AdvancedSectionProps) {
  return (
    <Collapsible defaultOpen={defaultOpen} className="border-t">
      <CollapsibleTrigger
        render={
          <Button
            type="button"
            variant="unstyled"
            size="unstyled"
            className="group flex w-full items-center justify-between bg-muted/40 px-3 py-2 text-sm font-semibold"
          />
        }
      >
        Advanced settings
        <ChevronDownIcon className="size-4 transition-transform group-data-panel-open:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent className="flex flex-col gap-5 p-3">
        <AdvancedGroup
          title="Network simulation"
          description="Degrade the connection to see how the agent copes."
        >
          <SliderField
            name="packetLossPercent"
            label="Packet Loss"
            icon={WifiOffIcon}
            min={PACKET_LOSS_MIN}
            max={PACKET_LOSS_MAX}
            step={1}
            suffix="%"
            rangeText="0% to 100%"
          />
        </AdvancedGroup>
        <BackgroundVolumeGroup />
        <AdvancedGroup
          title="Idle message plan"
          description="When the agent speaks up after silence."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <OptionalNumberField
              name="idleTimeoutSeconds"
              label="Idle Timeout (seconds)"
              placeholder="e.g. 10"
              step={1}
            />
            <OptionalNumberField
              name="idleMessageMaxSpokenCount"
              label="Max Idle Prompts"
              placeholder="e.g. 3"
              step={1}
            />
          </div>
        </AdvancedGroup>
        <AdvancedGroup
          title="Speaking plan"
          description="How the agent takes and yields its turn."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <OptionalNumberField
              name="startSpeakingWaitSeconds"
              label="Start Wait Seconds"
              placeholder="e.g. 0.7"
              step={0.1}
            />
            <OptionalNumberField
              name="stopSpeakingNumWords"
              label="Num Words"
              placeholder="e.g. 3"
              step={1}
            />
            <OptionalNumberField
              name="stopSpeakingVoiceSeconds"
              label="Voice Seconds"
              placeholder="e.g. 0.3"
              step={0.1}
            />
            <OptionalNumberField
              name="stopSpeakingBackoffSeconds"
              label="Backoff Seconds"
              placeholder="e.g. 0"
              step={0.1}
            />
          </div>
        </AdvancedGroup>
        <p className="flex gap-2 border-t pt-3 text-xs text-muted-foreground">
          <InfoIcon className="mt-0.5 size-3.5 shrink-0" />
          Invalid or incompatible combinations may cause unexpected bot
          behaviour. The server will reset affected fields to their default
          values.
        </p>
      </CollapsibleContent>
    </Collapsible>
  );
}
