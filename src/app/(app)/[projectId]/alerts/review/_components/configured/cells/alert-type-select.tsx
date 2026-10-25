'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AlertTypeTableLabel } from '@/server/alerts/constants/alert-type-labels';
import { ALERT_TYPES_BY_EVAL_TYPE } from '@/server/alerts/constants/alert-type-options';
import type { AlertRow } from '@/server/alerts/types';

import { useIsUpdatingAlert } from '../../../_hooks/mutations/use-is-updating-alert';
import { useUpdateAlertMutation } from '../../../_hooks/mutations/use-update-alert-mutation';
import { defaultParamsOf } from '../../../_utils/alert-params';

type AlertTypeSelectProps = {
  alert: AlertRow;
};

export function AlertTypeSelect({ alert }: AlertTypeSelectProps) {
  const updateAlert = useUpdateAlertMutation();
  const isUpdating = useIsUpdatingAlert(alert.id);
  const items = ALERT_TYPES_BY_EVAL_TYPE[alert.metric.evalType].map((type) => ({
    value: type,
    label: AlertTypeTableLabel[type],
  }));

  return (
    <Select
      items={items}
      value={alert.type}
      disabled={isUpdating}
      onValueChange={(type) => {
        if (type === null || type === alert.type) return;
        updateAlert.mutate({
          alertId: alert.id,
          params: defaultParamsOf(type),
        });
      }}
    >
      <SelectTrigger size="sm" aria-label="Alert type" className="w-44 text-xs">
        <SelectValue />
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
