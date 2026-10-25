'use client';

import {
  MONITOR_PRESETS,
  MonitorPreset,
} from '@/components/common/monitor-dialog/_constants/monitor-preset';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { useScenarioCount } from '../../_hooks/use-scenario-count';
import { presetEstimate } from '../../_utils/preset-estimate';
import { PresetDailyRate } from './preset-daily-rate';

interface PresetCardProps {
  preset: MonitorPreset;
  onSelect: (preset: MonitorPreset) => void;
}

export function PresetCard({ preset, onSelect }: PresetCardProps) {
  const scenarioCount = useScenarioCount();
  const config = MONITOR_PRESETS[preset];
  const estimate = presetEstimate(preset, scenarioCount);

  return (
    <Button
      type="button"
      variant="unstyled"
      size="unstyled"
      onClick={() => onSelect(preset)}
      className={cn(
        'flex h-auto flex-col items-stretch gap-0 rounded-lg border border-border bg-background p-3 text-left whitespace-normal hover:bg-muted/40',
        preset === MonitorPreset.qualityCheck && 'border-foreground',
      )}
    >
      <span className="text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
        {config.caption}
      </span>
      <span className="text-sm font-semibold">{config.title}</span>
      <span className="mt-1 text-xs text-muted-foreground">
        {config.description}
      </span>
      <span className="mt-3 border-t pt-2 text-xs text-muted-foreground">
        <span className="font-medium text-foreground tabular-nums">
          {estimate.callsPerWeek} {estimate.unit}
        </span>{' '}
        / week
        <PresetDailyRate dailyRate={estimate.dailyRate} />
      </span>
    </Button>
  );
}
