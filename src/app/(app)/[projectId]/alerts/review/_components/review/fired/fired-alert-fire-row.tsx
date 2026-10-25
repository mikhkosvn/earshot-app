'use client';

import { format } from 'date-fns';

import type { AlertFireRef } from '@/server/alerts/types';

import { FireCallLink } from './fire-call-link';

const FIRE_TIME_FORMAT = 'MMM d, HH:mm:ss';

interface FiredAlertFireRowProps {
  fire: AlertFireRef;
}

export function FiredAlertFireRow({ fire }: FiredAlertFireRowProps) {
  return (
    <li className="flex flex-col gap-0.5 rounded-md border bg-muted/30 px-2 py-1.5">
      <div className="flex items-center justify-between gap-2">
        <span
          suppressHydrationWarning
          className="text-[11px] text-muted-foreground"
        >
          {format(fire.triggeredAt, FIRE_TIME_FORMAT)}
        </span>
        <FireCallLink callLogId={fire.callLogId} />
      </div>
      <p className="text-[11px] leading-snug">{fire.message}</p>
    </li>
  );
}
