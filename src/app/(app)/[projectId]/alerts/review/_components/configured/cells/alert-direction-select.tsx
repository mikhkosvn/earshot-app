'use client';

import { TriangleAlertIcon } from 'lucide-react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AlertType, ChangeDirection } from '@/generated/prisma/enums';
import {
  ChangeDirectionLabel,
  ChangeDirectionShortLabel,
} from '@/server/alerts/constants/change-direction-labels';
import type { AlertRow } from '@/server/alerts/types';

import { useIsUpdatingAlert } from '../../../_hooks/mutations/use-is-updating-alert';
import { useUpdateAlertMutation } from '../../../_hooks/mutations/use-update-alert-mutation';

const items = Object.values(ChangeDirection).map((direction) => ({
  value: direction,
  label: ChangeDirectionLabel[direction],
}));

interface AlertDirectionSelectProps {
  alert: AlertRow;
}

export function AlertDirectionSelect({ alert }: AlertDirectionSelectProps) {
  const updateAlert = useUpdateAlertMutation();
  const isUpdating = useIsUpdatingAlert(alert.id);

  return (
    <Select
      items={items}
      value={alert.direction}
      disabled={isUpdating || alert.type !== AlertType.significant_change}
      onValueChange={(direction) => {
        if (direction === null) return;
        updateAlert.mutate({ alertId: alert.id, direction });
      }}
    >
      <SelectTrigger
        size="sm"
        aria-label="Alert direction"
        className="w-32 text-xs"
      >
        <TriangleAlertIcon className="text-muted-foreground" />
        <SelectValue>
          {(direction: ChangeDirection) => ChangeDirectionShortLabel[direction]}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem key={item.value} value={item.value} className="text-xs">
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
