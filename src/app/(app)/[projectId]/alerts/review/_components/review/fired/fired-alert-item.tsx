'use client';

import { RelativeTime } from '@/components/common/relative-time';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { AlertTypeTableLabel } from '@/server/alerts/constants/alert-type-labels';
import type { FiredAlertSummary } from '@/server/alerts/types';

import { firesText } from '../../../_utils/fires-text';
import { FiredAlertFireRow } from './fired-alert-fire-row';

const FIRED_ALERT_ITEM_VALUE = 'fired-alert';

interface FiredAlertItemProps {
  alert: FiredAlertSummary;
}

export function FiredAlertItem({ alert }: FiredAlertItemProps) {
  return (
    <li>
      <Accordion>
        <AccordionItem value={FIRED_ALERT_ITEM_VALUE}>
          <AccordionTrigger className="gap-2 rounded-none px-3 py-2.5 hover:bg-muted/50 hover:no-underline">
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="truncate text-xs font-medium">{alert.name}</span>
              <span className="truncate text-[11px] font-normal text-muted-foreground">
                {AlertTypeTableLabel[alert.type]} on {alert.metricName}
              </span>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-0.5 font-normal">
              <Badge variant="destructive" className="text-[11px]">
                {firesText(alert.count)}
              </Badge>
              <RelativeTime date={alert.lastTriggeredAt} />
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-0">
            <ul className="flex flex-col gap-1.5 px-3 pb-3">
              {alert.recent.map((fire) => (
                <FiredAlertFireRow key={fire.id} fire={fire} />
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </li>
  );
}
