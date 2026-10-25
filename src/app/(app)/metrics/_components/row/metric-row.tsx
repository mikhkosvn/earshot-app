'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ChevronDownIcon, GripVerticalIcon } from 'lucide-react';
import { useState } from 'react';

import { IdChip } from '@/components/common/clipboard/id-chip';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { EvaluationTriggerLabel } from '@/server/metrics/constants/evaluation-trigger-labels';
import { MetricEvalTypeLabel } from '@/server/metrics/constants/metric-eval-type-labels';
import type { MetricListItem } from '@/server/metrics/types';

import { MetricFlag } from '../../_constants/metric-flag';
import { METRIC_GRID_CLASS } from '../../_constants/metric-grid';
import { ManageAgentsButton } from './manage-agents-button';
import { MetricEditAction } from './metric-edit-action';
import { MetricFlagSwitch } from './metric-flag-switch';
import { MetricRowDetails } from './metric-row-details';
import { MetricRowMenu } from './metric-row-menu';

interface MetricRowProps {
  metric: MetricListItem;
  selected: boolean;
  onSelectedChange: (checked: boolean) => void;
}

export function MetricRow({
  metric,
  selected,
  onSelectedChange,
}: MetricRowProps) {
  const [expanded, setExpanded] = useState(false);
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: metric.id });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Translate.toString(transform), transition }}
      data-dragging={isDragging}
      className="bg-background data-[dragging=true]:relative data-[dragging=true]:z-10 data-[dragging=true]:shadow-md"
    >
      <div className={cn(METRIC_GRID_CLASS, 'h-9 text-xs hover:bg-muted/40')}>
        <Checkbox
          aria-label={`Select ${metric.name}`}
          checked={selected}
          onCheckedChange={onSelectedChange}
        />
        <Button
          ref={setActivatorNodeRef}
          type="button"
          variant="ghost"
          size="icon-xs"
          className="size-4 cursor-grab touch-none active:cursor-grabbing"
          {...attributes}
          {...listeners}
          aria-label={`Drag ${metric.name}`}
        >
          <GripVerticalIcon />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          className="size-4"
          aria-label={`Expand ${metric.name}`}
          aria-expanded={expanded}
          onClick={() => setExpanded((value) => !value)}
        >
          <ChevronDownIcon
            data-expanded={expanded}
            className="transition-transform data-[expanded=true]:rotate-180"
          />
        </Button>
        <IdChip id={metric.id} className="w-fit" />
        <span className="truncate font-semibold">{metric.name}</span>
        <span className="text-muted-foreground">
          {MetricEvalTypeLabel[metric.evalType]}
        </span>
        <span className="text-muted-foreground">
          {EvaluationTriggerLabel[metric.evaluationTrigger]}
        </span>
        <MetricFlagSwitch
          metric={metric}
          flag={MetricFlag.observabilityEnabled}
          locked={metric.observabilityLocked}
        />
        <MetricFlagSwitch
          metric={metric}
          flag={MetricFlag.simulationEnabled}
          locked={false}
        />
        <MetricFlagSwitch
          metric={metric}
          flag={MetricFlag.samplingEnabled}
          locked={false}
        />
        <div className="flex items-center gap-1">
          <MetricEditAction metric={metric} />
          <ManageAgentsButton metric={metric} />
          <MetricRowMenu metric={metric} />
        </div>
      </div>
      <MetricRowDetails metric={metric} expanded={expanded} />
    </div>
  );
}
