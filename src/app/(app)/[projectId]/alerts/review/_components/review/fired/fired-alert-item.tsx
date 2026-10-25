'use client';

import { ChevronRightIcon } from 'lucide-react';

import { RelativeTime } from '@/components/common/relative-time';
import { Badge } from '@/components/ui/badge';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { AlertTypeTableLabel } from '@/server/alerts/constants/alert-type-labels';
import type { FiredAlertSummary } from '@/server/alerts/types';

import { firesText } from '../../../_utils/fires-text';
import { FiredAlertFireRow } from './fired-alert-fire-row';

interface FiredAlertItemProps {
  alert: FiredAlertSummary;
}

export function FiredAlertItem({ alert }: FiredAlertItemProps) {
  return (
    <li>
      <Collapsible>
        <CollapsibleTrigger className="group/fired flex w-full items-start gap-2 px-3 py-2.5 text-left hover:bg-muted/50">
          <ChevronRightIcon className="mt-0.5 size-3.5 shrink-0 text-muted-foreground transition-transform group-data-panel-open/fired:rotate-90" />
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="truncate text-xs font-medium">{alert.name}</span>
            <span className="truncate text-[11px] text-muted-foreground">
              {AlertTypeTableLabel[alert.type]} on {alert.metricName}
            </span>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-0.5">
            <Badge variant="destructive" className="text-[11px]">
              {firesText(alert.count)}
            </Badge>
            <RelativeTime date={alert.lastTriggeredAt} />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <ul className="flex flex-col gap-1.5 px-3 pb-3 pl-8">
            {alert.recent.map((fire) => (
              <FiredAlertFireRow key={fire.id} fire={fire} />
            ))}
          </ul>
        </CollapsibleContent>
      </Collapsible>
    </li>
  );
}
