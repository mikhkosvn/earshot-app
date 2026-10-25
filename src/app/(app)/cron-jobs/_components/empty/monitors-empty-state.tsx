'use client';

import { ArrowRightIcon, Repeat2Icon } from 'lucide-react';
import { useState } from 'react';

import { EmptyState } from '@/components/common/empty-state';
import {
  MONITOR_PRESET_ORDER,
  type MonitorPreset,
} from '@/components/common/monitor-dialog/_constants/monitor-preset';
import { CreateMonitorDialog } from '@/components/common/monitor-dialog/create-monitor-dialog';
import { Button } from '@/components/ui/button';

import { PresetCard } from './preset-card';

interface DialogState {
  open: boolean;
  preset: MonitorPreset | null;
}

const CLOSED: DialogState = { open: false, preset: null };

export function MonitorsEmptyState() {
  const [dialog, setDialog] = useState<DialogState>(CLOSED);

  return (
    <div className="overflow-hidden rounded-lg border bg-background">
      <EmptyState
        icon={Repeat2Icon}
        title="No monitors yet"
        description="Watch your live agent with scheduled synthetic calls. Monitors run your scenarios on a schedule and alert you the moment something breaks."
      >
        <div className="grid w-full max-w-3xl gap-3 md:grid-cols-3">
          {MONITOR_PRESET_ORDER.map((preset) => (
            <PresetCard
              key={preset}
              preset={preset}
              onSelect={(selected) =>
                setDialog({ open: true, preset: selected })
              }
            />
          ))}
        </div>
      </EmptyState>
      <div className="flex items-center justify-center gap-1 border-t bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
        Need a specific cadence?
        <Button
          type="button"
          variant="link"
          size="sm"
          className="h-auto px-0 text-xs"
          onClick={() => setDialog({ open: true, preset: null })}
        >
          Advanced setup
          <ArrowRightIcon />
        </Button>
      </div>
      <CreateMonitorDialog
        open={dialog.open}
        onOpenChange={(open) => setDialog({ ...dialog, open })}
        preset={dialog.preset}
      />
    </div>
  );
}
