'use client';

import { CheckIcon, PhoneIcon } from 'lucide-react';
import { useFormContext, useWatch } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import type { AgentConfigValues } from '@/server/agents/types';

import { SelectedTileBadge } from '../provider/selected-tile-badge';

export function TelephonyToggle() {
  const { control, setValue } = useFormContext<AgentConfigValues>();
  const enabled = useWatch({ control, name: 'telephonyEnabled' });

  return (
    <Button
      type="button"
      variant="unstyled"
      size="unstyled"
      aria-pressed={enabled}
      className="relative flex h-16 flex-col gap-1.5 rounded-lg border border-border bg-background text-[11px] font-medium hover:bg-muted aria-pressed:border-2 aria-pressed:border-foreground"
      onClick={() =>
        setValue('telephonyEnabled', !enabled, { shouldDirty: true })
      }
    >
      <PhoneIcon className="size-5" />
      Telephony
      <SelectedTileBadge selected={enabled}>
        <CheckIcon className="size-2.5" />
      </SelectedTileBadge>
    </Button>
  );
}
